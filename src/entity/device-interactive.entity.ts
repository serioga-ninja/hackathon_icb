import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceEntity } from './device.entity';
import { FlatBlockEntity } from './flat-block.entity';

export enum EDeviceState {
  Working,
  NotWorking
}

export abstract class DeviceInteractiveEntity extends DeviceEntity {

  abstract placeToInteract: FlatBlockEntity;

  deviceState: EDeviceState;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, key: string) {
    super(scene, blocksGroup, key);

    this.deviceState = EDeviceState.NotWorking;

    this.setInteractive();
    this.initializeEvents();
  }

  initializeEvents() {
    this.on('pointerdown', () => {
      this.onPointerdown();
    });
  }

  toggleWorkingState() {
    if (this.deviceState === EDeviceState.NotWorking) {
      this.deviceState = EDeviceState.Working;
    } else {
      this.deviceState = EDeviceState.NotWorking;
    }
  }

  turnOn() {

  }

  //#region Event Listeners callbacks
  onPointerdown() {

  }

  //#endregion
}
