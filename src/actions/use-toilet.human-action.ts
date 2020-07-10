import { HumanEntity } from '../entity/human.entity';
import { Toilet } from '../furniture/toilet';
import { HumanActionBase } from './human-action.base';

export class UseToiletHumanAction extends HumanActionBase {

  device: Toilet;

  constructor(human: HumanEntity, device: Toilet) {
    super(human);

    this.device = device;
  }

  start() {
    this.device.makeADump();
    setTimeout(() => this._finished = true, 1000);
  }

  update(time: number) {
  }
}
