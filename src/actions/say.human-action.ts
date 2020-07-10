import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class SayHumanAction extends HumanActionBase {

  message: string;
  lifeTime: number;
  stop: boolean;

  constructor(human: HumanEntity, message: string, lifeTime: number, stop: boolean = true) {
    super(human);

    this.message = message;
    this.lifeTime = lifeTime;
    this.stop = stop;
  }

  start() {
    this.human.say(this.message, 300, 50, this.lifeTime, true);

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
