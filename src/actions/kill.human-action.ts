import { HumanActionBase } from './human-action.base';

export class KillHumanAction extends HumanActionBase {

  start() {
    this.human.kill();
    setTimeout(() => {
      this._finished = true;
    }, 2000);
  }

  update(time: number) {
  }
}
