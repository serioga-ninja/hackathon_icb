import { HumanActionBase } from '../actions/human-action.base';
import { gameConfig, tileSize } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

export class Computer extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  turnOnOverlay: Phaser.Geom.Polygon;
  graphics: Phaser.GameObjects.Graphics;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'computer', DeviceType.Computer);

    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.computer;
    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;

    const {x, y} = blocksGroup.children.entries[0] as FlatBlockEntity;

    this.turnOnOverlay = new Phaser.Geom.Polygon([
      new Phaser.Geom.Point(x + tileSize, y + tileSize * .25),
      new Phaser.Geom.Point(x + tileSize * 2.15, y + tileSize * .25),
      new Phaser.Geom.Point(x + tileSize * 2.8, y - tileSize * .9),
      new Phaser.Geom.Point(x + tileSize * .4, y - tileSize * .9)
    ]);

    this.setInteractive();
  }

  turnOn(human?: HumanEntity, action?: HumanActionBase) {
    super.turnOn(human, action);

    this.graphics.clear();
    this.graphics.fillGradientStyle(0xffffffAA, 0xffffffAA, 0xffffffFF, 0xffffffFF, .3);
    this.graphics.fillPoints(this.turnOnOverlay.points, true);
  }

  turnOff() {
    super.turnOff();

    this.graphics.clear();
  }
}
