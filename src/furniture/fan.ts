import { DeviceType } from '../actions/action-group.base';
import { gameConfig } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';

export class Fan extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'fan', DeviceType.Fan);

    this.placeToInteract = placeToInteract;
    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.fan;
  }

  onPointerdown() {
    alert('Fan is on!');
  }
}
