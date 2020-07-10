import { HumanActionBase } from '../actions/human-action.base';
import { SAD_FACE } from '../core/game.vocabulary';
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
  protected humanMessage: string;
  protected decreaseMood: number;

  deviceState: EDeviceState;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, key: string, type: DeviceType) {
    super(scene, blocksGroup, key, type);

    this.deviceState = EDeviceState.NotWorking;
    this.humanMessage = SAD_FACE;
    this.decreaseMood = 20;

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

    if (this.humanAction && !this.humanAction.finished) {
      this.human.say(this.humanMessage, 300, 50, 2000);
      this.humanAction.gameStats.decreaseToStat('humanMood', this.decreaseMood);
      this.humanAction.finish();
    }
  }

  onPointerdown() {
    this.toggleWorkingState();
  }
}
