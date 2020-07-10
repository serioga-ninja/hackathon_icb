import { HumanActionBase } from '../actions/human-action.base';
import { gameConfig, tileSize } from '../core/game.config';
import { CLOSE_FRIGE_HUMAN, I_WAS_WATCHING } from '../core/game.vocabulary';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

const spriteTextures: any = {
  off: 'fridge',
  on: 'fridgeOn'
};

export class Fridge extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  turnOnOverlay: Phaser.Geom.Polygon;
  graphics: Phaser.GameObjects.Graphics;
  electricityConsumePerTime: number;
  openFridgeImg: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, spriteTextures.off, DeviceType.Fridge);

    const {x, y} = blocksGroup.children.entries[0] as FlatBlockEntity;

    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.fridge;
    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;

    this.openFridgeImg = this.scene.add.image(x + tileSize * .3, y - tileSize * .84, 'fridgeDoor');
    this.openFridgeImg.setVisible(false);
    this.scene.add.existing(this.openFridgeImg);

    this.turnOnOverlay = new Phaser.Geom.Polygon([
      new Phaser.Geom.Point(x - tileSize * .4, y - tileSize * .26),
      new Phaser.Geom.Point(x + tileSize * .4, y - tileSize * .26),
      new Phaser.Geom.Point(x + tileSize * .2, y - tileSize * 1.2),
      new Phaser.Geom.Point(x - tileSize, y - tileSize * 1.2)
    ]);

    this.setInteractive();
    this.humanMessage = CLOSE_FRIGE_HUMAN;
    this.decreaseMood = gameConfig.moodDestroyers.closeFridge;
  }

  turnOn(human: HumanEntity, action: HumanActionBase) {
    super.turnOn(human, action);

    this.graphics.clear();
    this.deviceState = EDeviceState.Working;
    this.graphics.fillGradientStyle(0x0037d4AA, 0x0037d4AA, 0x0037d4FF, 0x0037d4FF, .3);
    this.graphics.fillPoints(this.turnOnOverlay.points, true);
    this.setTexture(spriteTextures.on);
    this.openFridgeImg.setVisible(true);
  }

  turnOff() {
    super.turnOff();

    this.graphics.clear();
    this.setTexture(spriteTextures.off);
    this.openFridgeImg.setVisible(false);
  }
}
