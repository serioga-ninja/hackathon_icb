import { EGroupTypes, GroupBase } from '../core/group.base';

export class MovableBlocksGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.MovableBlocks;
  }
}
