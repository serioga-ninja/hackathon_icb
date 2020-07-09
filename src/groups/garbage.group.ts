import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { GarbageEntity } from '../entity/garbage.entity';

export class GarbageGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.Garbage;
  }

  throwGarbage(block: FlatBlockEntity) {
    if (!block) return;

    this.add(new GarbageEntity(this.scene, block));
  }
}
