import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';

export class NotMovableBlocksGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.NotMovableBlocks;
  }

  removeBlocksMovableRelations() {
    for (const block of this.getChildren() as FlatBlockEntity[]) {
      block.makeImovable();
    }

  }
}
