import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceEntity } from './device.entity';

export class DeviceInteractiveEntity extends DeviceEntity {

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, key: string) {
    super(scene, blocksGroup, key);

    this.setInteractive();
    this.initializeEvents();
  }

  initializeEvents() {
    this.on('pointerdown', this.onPointerdown);
  }

  //#region Event Listeners callbacks
  onPointerdown() {

  }

  //#endregion
}
