import { GameStats } from '../core/game.stats';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class UseDeviceHumanAction extends HumanActionBase {

  device: DeviceInteractiveEntity;
  time: number;

  constructor(human: HumanEntity, gameStats: GameStats, device: DeviceInteractiveEntity, time: number) {
    super(human, gameStats);

    this.device = device;
    this.time = time;
  }

  start() {
    this.device.turnOn(this.human, this);
    setTimeout(() => this._finished = true, this.time);
  }

  update(time: number) {
  }
}
