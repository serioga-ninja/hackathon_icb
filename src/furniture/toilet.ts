import { gameConfig } from '../core/game.config';
import { IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
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

    this.waterConsumePerTime = gameConfig.consumePerTick.water.toilet;
    this.placeToInteract = placeToInteract;
  }

  turnOn() {
    if (this.deviceState === EDeviceState.Working) return;
    this.deviceState = EDeviceState.Working;
    this.setTexture(spriteTextures.on);
  }

  turnOff() {
    super.turnOff();

    this.setTexture(spriteTextures.off);
  }
}
