import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';

export class Music extends DeviceInteractiveEntity {
  placeToInteract: FlatBlockEntity;
  turnOnOverlay: Phaser.Geom.Polygon;
  graphics: Phaser.GameObjects.Graphics

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'music');

    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;
    this.turnOnOverlay = new Phaser.Geom.Polygon([
      1279, 97,
      1409, 97,
      1537, 251,
      1152, 251,
    ]);
    this.setInteractive();
  }

  onPointerdown() {
    this.toggleWorkingState();

    if (this.deviceState === EDeviceState.Working) {
      this.graphics.fillStyle(0xffffff);
      this.graphics.fillPoints(this.turnOnOverlay.points, true);
      this.graphics.alpha = 0.5;
    } else {
      this.graphics.clear();
    }
  }
}