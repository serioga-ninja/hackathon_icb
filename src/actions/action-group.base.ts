import { HumanEntity } from '../entity/human.entity';

export enum EActionTypes {
  GoTo
}

export abstract class ActionGroupBase {
  get finished(): boolean {
    return this._finished;
  }

  abstract readonly actionType: EActionTypes;

  protected human: HumanEntity;
  protected readonly _finished: boolean;

  constructor(human: HumanEntity) {
    this.human = human;
    this._finished = false;
  }

  start() {
  }

  done() {
  }

  update(time: number) {
  }
}
