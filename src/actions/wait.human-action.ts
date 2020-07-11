import { EHumanState, HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class WaitHumanAction extends HumanActionBase {

  ms: number;
  state: EHumanState;

  constructor(human: HumanEntity, ms: number, state: EHumanState = EHumanState.waiting) {
    super(human);

    this.ms = ms;
    this.state = state;
  }

  start() {
    this.human.state = this.state;
    setTimeout(() => {
      this._finished = true;
    }, this.ms);
  }

  update(time: number) {
  }
}
