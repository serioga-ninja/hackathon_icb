import { gameConfig } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
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

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, spriteTextures.off, DeviceType.Fridge);

    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.fridge;
    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;

    let x = blocksGroup.children.entries[0].x;
    let y = blocksGroup.children.entries[0].y;

    this.turnOnOverlay = new Phaser.Geom.Polygon([
      x - 23, y - 15,
      x + 20, y - 15,
      x + 10, y - 60,
      x - 50, y - 60
    ]);

    this.setInteractive();
  }

  turnOn() {
    if (this.deviceState === EDeviceState.Working) return;

    this.deviceState = EDeviceState.Working;
    this.graphics.fillGradientStyle(0xffccffAA, 0xffccffAA, 0xffccffFF, 0xffccffFF, .3);
    this.graphics.fillPoints(this.turnOnOverlay.points, true);
    this.setTexture(spriteTextures.on);
  }

  turnOff() {
    super.turnOff();

    this.graphics.clear();
    this.setTexture(spriteTextures.off);
  }
}
