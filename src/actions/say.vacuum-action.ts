import { HumanEntity } from '../entity/human.entity';
import { Vacuum } from '../furniture/vacuum';
import { HumanActionBase } from './human-action.base';

export class SayVacuumAction extends HumanActionBase {

  message: string;
  lifeTime: number;
  stop: boolean;
  vacuum: Vacuum;

  constructor(human: HumanEntity, vacuum: Vacuum, message: string, lifeTime: number, stop: boolean = true) {
    super(human);

    this.message = message;
    this.lifeTime = lifeTime;
    this.stop = stop;
    this.vacuum = vacuum;
  }

  start() {
    this.vacuum.say(this.message, 300, 50, this.lifeTime);

    if (this.stop) {
      setTimeout(() => {
        this._finished = true;
      }, this.lifeTime)
    } else {
      this._finished = true;
    }
  }

  update(time: number) {
  }
}
