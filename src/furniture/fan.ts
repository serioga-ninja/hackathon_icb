import { DeviceType } from '../actions/action-group.base';
import { HumanActionBase } from '../actions/human-action.base';
import { gameConfig } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';

const spriteTextures: any = {
  off: 'fan',
  on: 'fanOn'
};

export class Fan extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, spriteTextures.off, DeviceType.Fan);

    this.placeToInteract = placeToInteract;
    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.fan;

    this.setInteractive();
  }

  turnOn(human?: HumanEntity, action?: HumanActionBase) {
    super.turnOn(human, action);

    this.setTexture(spriteTextures.on);
  }

  turnOff() {
    super.turnOff();

    this.setTexture(spriteTextures.off);
  }
}
