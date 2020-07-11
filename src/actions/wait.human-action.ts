import { EHumanState, HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class WaitHumanAction extends HumanActionBase {

  ms: number;

  constructor(human: HumanEntity, ms: number) {
    super(human);

    this.ms = ms;
  }

  start() {
    this.human.state = EHumanState.waiting;
    setTimeout(() => {
      this._finished = true;
    }, this.ms);
  }

  update(time: number) {
  }
}
