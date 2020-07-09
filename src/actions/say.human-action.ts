import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class SayHumanAction extends HumanActionBase {

  message: string;
  lifeTime: number;

  constructor(human: HumanEntity, message: string, lifeTime: number) {
    super(human);

    this.message = message;
    this.lifeTime = lifeTime;
  }

  start() {
    this.human.say(this.message, 300, 50, this.lifeTime);
    setTimeout(() => {
      this._finished = true;
    }, this.lifeTime)
  }

  update(time: number) {
  }
}
