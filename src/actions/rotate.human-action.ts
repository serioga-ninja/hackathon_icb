import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class RotateHumanAction extends HumanActionBase {

  angle: number;

  constructor(human: HumanEntity, angle: number) {
    super(human);

    this.angle = angle;
  }

  start() {
    this.human.angle = this.angle;
    this._finished = true;
  }

  update(time: number) {
  }
}
