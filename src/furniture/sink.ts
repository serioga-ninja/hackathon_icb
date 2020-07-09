import { DeviceType } from '../actions/action-group.base';
import { gameConfig } from '../core/game.config';
import { IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';

export class Sink extends DeviceInteractiveEntity implements IWaterObject {
  placeToInteract: FlatBlockEntity;
  waterConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'sink', DeviceType.Sink);

    this.waterConsumePerTime = gameConfig.consumePerTick.water.sink;
    this.placeToInteract = placeToInteract;
  }
}
