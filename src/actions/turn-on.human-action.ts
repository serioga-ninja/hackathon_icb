import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class TurnOnHumanAction extends HumanActionBase {

  device: DeviceInteractiveEntity;

  constructor(human: HumanEntity, device: DeviceInteractiveEntity) {
    super(human);

    this.device = device;
  }

  start() {
    this.device.turnOn();
    setTimeout(() => this._finished = true, 1000);
  }

  update(time: number) {
  }
}
