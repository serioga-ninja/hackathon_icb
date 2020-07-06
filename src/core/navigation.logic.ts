import { FlatBlockEntity } from '../entity/flat-block.entity';
import { DoorGroup } from '../groups/door.group';
import { RoomsGroups } from '../groups/rooms-groups';
import { EGroupTypes } from './group.base';

export class NavigationLogic {

  private readonly blocks: FlatBlockEntity[][];
  private readonly pathRelatedBlocks: FlatBlockEntity[];
  private endPositionFound: boolean;

  constructor(blocks: FlatBlockEntity[][], pathRelatedBlocks: FlatBlockEntity[]) {
    this.blocks = blocks;
    this.pathRelatedBlocks = pathRelatedBlocks;
    this.endPositionFound = false;
  }

  private findPath(path: FlatBlockEntity[], humanPosition: FlatBlockEntity): FlatBlockEntity[] {
    const currentPathBlock = path[path.length - 1];
    const relatedFinalBlock = currentPathBlock.relatedMovableBlocks.find((b) => b.objID === humanPosition.objID);

    // we find the last humanPosition
    if (relatedFinalBlock) {
      return path;
    }

    for (const relatedBlock of currentPathBlock.relatedMovableBlocks) {
      if (relatedBlock.waveValue >= currentPathBlock.waveValue && !currentPathBlock.isDoor) continue;

      if (currentPathBlock.isDoor) {
        const doorGroup = currentPathBlock.getGroup(EGroupTypes.doors) as DoorGroup;
        const previousBlockRoom = path[path.length - 2].getGroup(EGroupTypes.room) as RoomsGroups;
        const anotherRoom = doorGroup
          .getRooms()
          .find((room) => room.groupId !== previousBlockRoom.groupId) as RoomsGroups;

        if (!anotherRoom || !!anotherRoom && !anotherRoom.contains(relatedBlock)) continue;
      }

      return this.findPath([...path, relatedBlock], humanPosition);
    }
  }

  private updateWaveValues(block: FlatBlockEntity, roomGroup: RoomsGroups, endPosition: FlatBlockEntity, doorGroup?: DoorGroup) {
    const relatedRoomsQueue = [];

    for (const roomBlock of roomGroup.getChildren() as FlatBlockEntity[]) {
      if (this.endPositionFound) return;

      if (roomBlock.isDoor) {
        if (doorGroup && doorGroup.contains(roomBlock)) {
          continue;
        }

        const roomBlockDoorGroup = roomBlock.getGroup(EGroupTypes.doors) as DoorGroup;
        for (const doorBlock of roomBlockDoorGroup.getChildren() as FlatBlockEntity[]) {
          doorBlock.waveValue = 0;
        }

        const anotherRoom = roomBlockDoorGroup
          .getRooms()
          .find((room) => room.groupId !== roomGroup.groupId) as RoomsGroups;

        // if there is still not marked elements
        if (anotherRoom && anotherRoom.markedBlocks().length !== anotherRoom.getChildren().length) {
          relatedRoomsQueue.push({ roomBlock, anotherRoom, roomBlockDoorGroup });
        }
      } else if (typeof roomBlock.waveValue !== 'number') {
        roomBlock.waveValue = Math.max(
          Math.abs(roomBlock.matrix.x - block.matrix.x),
          Math.abs(roomBlock.matrix.y - block.matrix.y),
        );
        this.endPositionFound = roomBlock.objID === endPosition.objID;
      }
    }

    while (relatedRoomsQueue.length > 0) {
      const { roomBlock, anotherRoom, roomBlockDoorGroup } = relatedRoomsQueue.shift();
      this.updateWaveValues(roomBlock, anotherRoom, endPosition, roomBlockDoorGroup);
    }
  }

  private clearWaveValues() {
    this.endPositionFound = false;
    for (const block of this.pathRelatedBlocks) {
      block.waveValue = null;
    }
  }

  generatePath(humanPosition: FlatBlockEntity, endPosition: FlatBlockEntity): FlatBlockEntity[] {
    this.clearWaveValues();
    this.updateWaveValues(humanPosition, humanPosition.getGroup(EGroupTypes.room) as RoomsGroups, endPosition);

    return this.findPath([endPosition], humanPosition)
  }
}
