import { gameConfig } from '../core/game.config';
import { IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

export class Bath extends DeviceInteractiveEntity implements IWaterObject {
  placeToInteract: FlatBlockEntity;
  graphics: Phaser.GameObjects.Graphics;
  waterConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'bath', DeviceType.Bath);

    this.waterConsumePerTime = gameConfig.consumePerTick.water.bath;
    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;
  }

  turnOn() {
    if (this.deviceState === EDeviceState.Working) return;
    this.deviceState = EDeviceState.Working;
    this.setTexture('bathOn');
  }

  turnOff() {
    super.turnOff();

    this.setTexture('bath');
  }
}
