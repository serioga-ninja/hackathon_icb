import { tileSize } from '../core/game.config';
import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';

export class MovableBlocksGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.MovableBlocks;
  }

  getClosest(x: number, y: number): FlatBlockEntity {
    let distance = Number.MAX_VALUE;
    let res: FlatBlockEntity;

    for (const block of this.getChildren() as FlatBlockEntity[]) {
      const d = block.widthTo({ x, y });
      if (d < distance) {
        distance = d;
        res = block;
      }

      if (distance < tileSize) {
        return res;
      }
    }

    return res;
  }
}
