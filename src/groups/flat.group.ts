import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { Vacuum } from '../furniture/vacuum';

export class FlatGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.Flat;
  }

  overlapVacuum(vacuum: Vacuum) {
    this.scene.physics.add.overlap(this, vacuum, (block: FlatBlockEntity, vacuum: Vacuum) => {
      if (block.isMovable && !vacuum.overlapBlock) {
        vacuum.overlapBlock = block;
      } else if (block.isMovable && vacuum.overlapBlock && vacuum.widthTo(block) < vacuum.widthTo(vacuum.overlapBlock)) {
        vacuum.overlapBlock = block;
      }
    });
  }
}
