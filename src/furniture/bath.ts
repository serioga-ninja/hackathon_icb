import { HumanActionBase } from '../actions/human-action.base';
import { gameConfig } from '../core/game.config';
import { IM_GONA_BE_DIRTY } from '../core/game.vocabulary';
import { IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

const spriteTextures: any = {
  off: 'bath',
  on: 'bathOn'
};

export class Bath extends DeviceInteractiveEntity implements IWaterObject {
  placeToInteract: FlatBlockEntity;
  waterConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, spriteTextures.off, DeviceType.Bath);

    this.waterConsumePerTime = gameConfig.consumePerTick.water.bath;
    this.placeToInteract = placeToInteract;
    this.humanMessage = IM_GONA_BE_DIRTY;
    this.messageWidth = 250;
    this.decreaseMood = gameConfig.moodDestroyers.turnOffBath;
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
