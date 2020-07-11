import { HumanActionBase } from '../actions/human-action.base';
import { gameConfig } from '../core/game.config';
import { I_WAS_LISTENING, I_WAS_WATCHING } from '../core/game.vocabulary';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

const spriteTextures: any = {
  off: 'music',
  on: 'musicOn'
};

export class Music extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, spriteTextures.off, DeviceType.Music);

    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.music;
    this.placeToInteract = placeToInteract;

    this.setInteractive();
    this.humanMessage = I_WAS_LISTENING;
    this.messageWidth = 250;
    this.decreaseMood = gameConfig.moodDestroyers.turnOffMusic;
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
