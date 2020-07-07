import { HumanEntity } from '../entity/human.entity';

export abstract class HumanActionBase {

  protected human: HumanEntity;
  protected _finished: boolean;

  get finished() {
    return this._finished;
  }

  constructor(human: HumanEntity) {
    this.human = human;
    this._finished = false;
  }

  abstract update(time: number): void;
}
