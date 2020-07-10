import { HumanActionBase } from '../actions/human-action.base';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { DeviceEntity } from './device.entity';
import { FlatBlockEntity } from './flat-block.entity';
import { DeviceType } from '../actions/action-group.base';
import { HumanEntity } from './human.entity';

export enum EDeviceState {
  Working,
  NotWorking
}

export abstract class DeviceInteractiveEntity extends DeviceEntity {

  abstract placeToInteract: FlatBlockEntity;
  protected humanAction: HumanActionBase;
  protected human: HumanEntity;

  deviceState: EDeviceState;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, key: string, type: DeviceType) {
    super(scene, blocksGroup, key, type);

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
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  turnOn(human?: HumanEntity, action?: HumanActionBase) {
    this.humanAction = action;
    this.human = human;
    this.deviceState = EDeviceState.Working;
  }

  turnOff() {
    this.deviceState = EDeviceState.NotWorking;
  }

  onPointerdown() {
    this.toggleWorkingState();
  }
}
