import { FlatBlockEntity } from '../entity/flat-block.entity';
import { DoorGroup } from '../groups/door.group';
import { RoomsGroups } from '../groups/rooms-groups';
import { EGroupTypes } from './group.base';

export interface IPathRelatedBlock {
  block: FlatBlockEntity;
  relatedPathBlocks: FlatBlockEntity[];
  waveValue: number;
}

let counter = 0;

export class NavigationLogic {

  private readonly blocks: FlatBlockEntity[][];
  private readonly pathRelatedBlocks: FlatBlockEntity[];

  constructor(blocks: FlatBlockEntity[][], pathRelatedBlocks: FlatBlockEntity[]) {
    this.blocks = blocks;
    this.pathRelatedBlocks = pathRelatedBlocks;
  }

  private findPath(path: FlatBlockEntity[], humanPosition: FlatBlockEntity): FlatBlockEntity[] {
    console.log('a');
    const currentPathBlock = path[path.length - 1];
    const relatedFinalBlock = currentPathBlock.relatedMovableBlocks.find((b) => b.objID === humanPosition.objID);

    // we find the last humanPosition
    if (relatedFinalBlock) {
      path.push(relatedFinalBlock);

      return path;
    }

    // look in to the all related blocks and find path with them recusevly
    let result = new Array(100000);
    for (const relatedBlock of currentPathBlock.relatedMovableBlocks) {
      if (relatedBlock.waveValue >= currentPathBlock.waveValue && !currentPathBlock.isDoor) continue;

      const _path = this.findPath([...path, relatedBlock], humanPosition);

      if (_path.length < result.length) result = _path;
    }

    // if there was no return then it's dead end
    return result;
  }

  private updateWaveValues(block: FlatBlockEntity, roomGroup: RoomsGroups, doorGroup?: DoorGroup) {
    for (const roomBlock of roomGroup.getChildren() as FlatBlockEntity[]) {
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
          console.log('anotherRoom', anotherRoom.groupId);
          this.updateWaveValues(roomBlock, anotherRoom, roomBlockDoorGroup);
        }
      } else if (typeof roomBlock.waveValue !== 'number') {
        roomBlock.waveValue = Math.max(
          Math.abs(roomBlock.matrix.x - block.matrix.x),
          Math.abs(roomBlock.matrix.y - block.matrix.y),
        );
        console.log(counter++, 'counter');
      }
    }

  }

  private clearWaveValues() {
    for (const block of this.pathRelatedBlocks) {
      block.waveValue = null;
    }
  }

  generatePath(humanPosition: FlatBlockEntity, endPosition: FlatBlockEntity): FlatBlockEntity[] {
    this.clearWaveValues();
    this.updateWaveValues(humanPosition, humanPosition.getGroup(EGroupTypes.room) as RoomsGroups);

    return [];
    // return this.findPath([endPosition], humanPosition)
  }
}
