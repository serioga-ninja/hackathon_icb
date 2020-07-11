import { gameConfig } from '../core/game.config';
import { GameStats } from '../core/game.stats';
import { IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

const spriteTextures: any = {
  off: 'toilet',
  on: 'toiletOn'
};

export class Toilet extends DeviceInteractiveEntity implements IWaterObject {
  placeToInteract: FlatBlockEntity;
  waterConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, spriteTextures.off, DeviceType.Toilet);

    this.waterConsumePerTime = gameConfig.consumePerClick.water.toilet;
    this.waterConsumePerTime = 0;
    this.placeToInteract = placeToInteract;
  }

  makeADump() {
    this.setTexture(spriteTextures.on);
  }

  turnOn() {
    GameStats.instance.decreaseToStat('water', this.waterConsumePerTime);

    this.setTexture(spriteTextures.off);
  }
}
