import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';

export class NotMovableBlocksGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.NotMovableBlocks;
  }

  get coords() {
    const minX = Math.min(...this.getChildren().map((block: FlatBlockEntity) => block.x));
    const maxX = Math.max(...this.getChildren().map((block: FlatBlockEntity) => block.x));
    const minY = Math.min(...this.getChildren().map((block: FlatBlockEntity) => block.y));
    const maxY = Math.max(...this.getChildren().map((block: FlatBlockEntity) => block.y));

    return {
      x: (maxX + minX) / 2,
      y: (maxY + minY) / 2,
    }
  }

  removeBlocksMovableRelations() {
    for (const block of this.getChildren() as FlatBlockEntity[]) {
      block.makeImovable();
    }

  }
}
