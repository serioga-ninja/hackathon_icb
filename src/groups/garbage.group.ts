import { gameConfig } from '../core/game.config';
import { GameStats } from '../core/game.stats';
import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { GarbageEntity } from '../entity/garbage.entity';
import { HumanEntity } from '../entity/human.entity';
import { Vacuum } from '../furniture/vacuum';

export class GarbageGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.Garbage;
  }

  throwGarbage(block: FlatBlockEntity) {
    if (!block) return;

    this.add(new GarbageEntity(this.scene, block));
  }

  overlapHuman(human: HumanEntity, gameStats: GameStats) {
    this.scene.physics.add.overlap(this, human, (garbage: GarbageEntity) => {
      if (garbage.readyToDecreaseMood) {
        gameStats.decreaseToStat('humanMood', gameConfig.moodDestroyers.garbage);
      }
    });
  }

  overlapVacuum(vacuum: Vacuum) {
    this.scene.physics.add.overlap(this, vacuum, (garbageEntity: GarbageEntity) => {
      this.remove(garbageEntity);
      garbageEntity.destroy(true);
    });
  }
}
