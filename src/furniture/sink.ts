import { HumanActionBase } from '../actions/human-action.base';
import { gameConfig } from '../core/game.config';
import { IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

const spriteTextures: any = {
  onKitchen: 'sinkOn',
  offKitchen: 'sink',
  onBath: 'sinkBathOn',
  offBath: 'sinkBath'
};

export class Sink extends DeviceInteractiveEntity implements IWaterObject {
  placeToInteract: FlatBlockEntity;
  waterConsumePerTime: number;
  key: string;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity, key: string) {
    super(scene, blocksGroup, key, DeviceType.Sink);

    this.waterConsumePerTime = gameConfig.consumePerTick.water.sink;
    this.placeToInteract = placeToInteract;
    this.key = key;

    this.setInteractive();
  }

  turnOn(human?: HumanEntity, action?: HumanActionBase) {
    super.turnOn(human, action);

    switch (this.key) {
      case spriteTextures.offKitchen:
        this.setTexture(spriteTextures.onKitchen);
        break;
      case spriteTextures.offBath:
        this.setTexture(spriteTextures.onBath);
    }

  }

  turnOff() {
    super.turnOff();

    this.setTexture(this.key);
  }
}
