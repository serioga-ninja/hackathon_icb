import { gameConfig, tileSize } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceType } from '../actions/action-group.base';

export class TV extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  turnOnOverlay: Phaser.Geom.Polygon;
  graphics: Phaser.GameObjects.Graphics;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'tv', DeviceType.TV);

    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.tv;
    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;

    let x = blocksGroup.children.entries[0].x;
    let y = blocksGroup.children.entries[0].y;

    this.turnOnOverlay = new Phaser.Geom.Polygon([
      x + tileSize * .15, y - tileSize * .25,
      x + tileSize * 1.8, y - tileSize * .25,
      x + tileSize * 2.5, y + tileSize,
      x - tileSize * .6, y + tileSize
    ]);

    this.setInteractive();
  }

  turnOn() {
    if (this.deviceState === EDeviceState.Working) return;

    this.deviceState = EDeviceState.Working;
    this.graphics.fillGradientStyle(0xffffffAA, 0xffffffAA, 0xffffffFF, 0xffffffFF, .3);
    this.graphics.fillPoints(this.turnOnOverlay.points, true);
  }

  turnOff() {
    super.turnOff();

    this.graphics.clear();
  }
}
