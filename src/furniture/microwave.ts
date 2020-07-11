import { HumanActionBase } from '../actions/human-action.base';
import { gameConfig } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

const spriteTextures: any = {
  off: 'microwave',
  on: 'microwaveOn'
};

export class Microwave extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, spriteTextures.off, DeviceType.Microwave);

    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.microwave;
    this.placeToInteract = placeToInteract;

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
