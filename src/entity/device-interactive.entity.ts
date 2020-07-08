import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceEntity } from './device.entity';
import { FlatBlockEntity } from './flat-block.entity';

export abstract class DeviceInteractiveEntity extends DeviceEntity {

  abstract placeToInteract: FlatBlockEntity;

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
