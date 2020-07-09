import { FlatBlockEntity } from '../entity/flat-block.entity';
import { FlatMap } from '../flat-map';
import { DoorGroup } from '../groups/door.group';
import { RoomGroup } from '../groups/room.group';
import { gameConfig } from '../core/game.config';
import { EGroupTypes } from './group.base';

export interface IPathRow {
  room: RoomGroup;
  startBlock: FlatBlockEntity;
  endBlock: FlatBlockEntity;
  path?: FlatBlockEntity[];
  line?: Phaser.Geom.Line;
}

export class NavigationLogic {

  private readonly pathRelatedBlocks: FlatBlockEntity[];
  private endPositionFound: boolean;
  private flatMap: FlatMap;
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;

  constructor(flatMap: FlatMap, scene: Phaser.Scene) {
    this.flatMap = flatMap;
    this.pathRelatedBlocks = this.flatMap.movableBlocks;
    this.endPositionFound = false;
    this.scene = scene;

    if (gameConfig.debug) {
      this.graphics = this.scene.add.graphics({
        lineStyle: { width: 2, color: 0xaa0000 },
        fillStyle: { color: 0x0000aa }
      });
    }

    this.generateRoomsRelations();
  }

  private generateRoomsRelations() {
    for (const doorGroup of this.flatMap.doors) {
      const rooms = doorGroup.getRooms();
      for (const room of rooms) {
        room.addRelatedRoom(rooms);
      }
    }
  }

  private generateAvailableRoomPath(path: RoomGroup[], endRoom: RoomGroup, availablePathList: RoomGroup[][] = []): RoomGroup[][] {
    const roomG = path[path.length - 1];
    if (roomG.groupId === endRoom.groupId) {
      availablePathList.push(path);

      return availablePathList;
    }

    roomG
      .relatedRooms
      .filter((room) => !path.find((roomInPath) => roomInPath.groupId === room.groupId))
      .forEach((room) => {
        if (endRoom.groupId === room.groupId) {
          path.push(endRoom);

          availablePathList.push(path);
        }

        this.generateAvailableRoomPath([...path, room], endRoom, availablePathList);
      });

    return availablePathList;
  }

  private findPath(path: FlatBlockEntity[], startBlock: FlatBlockEntity): FlatBlockEntity[] {
    const currentPathBlock = path[path.length - 1];
    const relatedFinalBlock = currentPathBlock.relatedMovableBlocks.find((b) => b.objID === startBlock.objID);

    // we find the last startBlock
    if (relatedFinalBlock) {
      return path;
    }

    let res: FlatBlockEntity[] = new Array(10000);

    // if end block is in the dead end we mark that block with the highest value
    const allRelatedWaVeIsHigher: boolean = currentPathBlock
      .relatedMovableBlocks
      .filter((block) => block.waveValue < currentPathBlock.waveValue).length === 0;

    if (allRelatedWaVeIsHigher) {
      const maxWaveValue: number = currentPathBlock
        .relatedMovableBlocks
        .filter((block) => block.waveValue >= currentPathBlock.waveValue)
        .filter((block) => !path.find((pBlock) => pBlock.objID === block.objID))
        .reduce((value, block) => {
          return Math.max(value, block.waveValue);
        }, 0) || 1000;

      currentPathBlock.waveValue = maxWaveValue + 1;
    }

    for (const relatedBlock of currentPathBlock.relatedMovableBlocks) {
      if (typeof relatedBlock.waveValue !== 'number' || relatedBlock.waveValue >= currentPathBlock.waveValue) continue;

      const foundPath = this.findPath([...path, relatedBlock], startBlock);
      if (foundPath.length < res.length) {
        res = foundPath;
      }
    }

    return res;
  }

  private calculatePath(path: RoomGroup[], startPoint: FlatBlockEntity, endPoint: FlatBlockEntity): number {
    return path.reduce((length, room, i) => {
      const firstRoom = i === 0;
      const lastRoom = i === path.length - 1;

      if (firstRoom) {
        const doorBetweenRooms = room.relatedToRoomDoor(path[i + 1]);
        length += startPoint.widthTo(doorBetweenRooms.getChildren()[0] as FlatBlockEntity);
      } else if (lastRoom) {
        const doorBetweenRooms = room.relatedToRoomDoor(path[i - 1]);
        length += endPoint.widthTo(doorBetweenRooms.getChildren()[0] as FlatBlockEntity);
      } else {
        const doorFrom = room.relatedToRoomDoor(path[i - 1]);
        const doorTo = room.relatedToRoomDoor(path[i + 1]);
        length += (doorFrom.getChildren()[0] as FlatBlockEntity).widthTo(doorTo.getChildren()[0] as FlatBlockEntity);
      }

      return length;
    }, 0);
  }

  generateRoomWaveNumbers(room: RoomGroup, startBlock: FlatBlockEntity) {
    for (const block of room.movableBlocks) {
      block.waveValue = Math.abs(startBlock.matrix.x - block.matrix.x) + Math.abs(startBlock.matrix.y - block.matrix.y);
    }
  }

  generatePath(startPosition: FlatBlockEntity, endPosition: FlatBlockEntity): Phaser.Curves.Path {
    const availableRoomPaths = this.generateAvailableRoomPath([startPosition.getGroup(EGroupTypes.Room) as RoomGroup], endPosition.getGroup(EGroupTypes.Room) as RoomGroup);

    let minPath: RoomGroup[] = new Array(10000);

    if (availableRoomPaths.length > 1) {
      let minPathLength = Number.MAX_VALUE;
      for (const path of availableRoomPaths) {
        const pathLength = this.calculatePath(path, startPosition, endPosition);
        if (pathLength < minPathLength) {
          minPathLength = pathLength;
          minPath = path;
        }
      }
    } else if (availableRoomPaths.length === 1) {
      minPath = availableRoomPaths[0];
    } else if (availableRoomPaths.length === 0) {
      console.error(`Can't find path!`, startPosition, endPosition);
    }

    const path = new Phaser.Curves.Path(startPosition.x, startPosition.y);
    const blockPath: FlatBlockEntity[] = [startPosition];

    return minPath
      .reduce((path, room, i) => {
        const lastRoom = i === minPath.length - 1;

        if (lastRoom) {
          this.generateRoomWaveNumbers(room, blockPath[blockPath.length - 1]);
          const blockFoundPath = this.findPath([endPosition], blockPath[blockPath.length - 1]);
          this.blockPathToPath(path, blockFoundPath);
          path.lineTo(endPosition.x, endPosition.y);
        } else {
          const doors = room.relatedToRoomDoor(minPath[i + 1]).getChildren()[0] as FlatBlockEntity;
          const entranceBlock = doors.getEntranceFromRoom(room);
          const exitBlock = doors.relatedEntranceBlocks
            .find((block) => block.getGroup(EGroupTypes.Room).groupId !== room.groupId);

          this.generateRoomWaveNumbers(room, blockPath[blockPath.length - 1]);
          const blockFoundPath = this.findPath([entranceBlock], blockPath[blockPath.length - 1]);
          this.blockPathToPath(path, blockFoundPath);
          path.lineTo(exitBlock.x, exitBlock.y);
          blockPath.push(exitBlock);
        }

        return path;
      }, path);
  }

  blockPathToPath(path: Phaser.Curves.Path, blockPath: FlatBlockEntity[]): void {
    for (let i = blockPath.length - 1; i >= 0; i--) {
      const block = blockPath[i];
      path.lineTo(block.x, block.y);
    }
  }
}
