import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';

export class TV extends DeviceInteractiveEntity {
  placeToInteract: FlatBlockEntity;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'tv');

    this.placeToInteract = placeToInteract;

    this.setInteractive();
    this.initializeEvents();
  }

  onPointerdown() {
    alert('TV is on!');
  }
}
