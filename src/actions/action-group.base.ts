import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

import { gameConfig } from '../core/game.config';

export enum EActionTypes {
  GoTo,
  WatchTV,
  ListenMusic,
  PlayComputer,
  TakeBath,
  OpenFridge,
  DrinkTea,
  Welcome,
}

export enum DeviceType {
  Simple,
  TV,
  Music,
  Light,
  Fan,
  Vacuum,
  Bath,
  Sink,
  Teapot,
  Fridge,
  Microwave,
  Oven,
  Computer
}

export abstract class ActionGroupBase {
  get finished(): boolean {
    return this._finished;
  }

  abstract readonly actionType: EActionTypes;

  protected human: HumanEntity;
  protected _finished: boolean;
  protected actions: HumanActionBase[];
  protected activeAction: HumanActionBase;

  public speed = gameConfig.speedOfWaiting;
  public inProgress: boolean;

  constructor(human: HumanEntity) {
    this.human = human;
    this._finished = false;
    this.inProgress = false;
    this.actions = [];
  }

  start() {
  }

  done() {
  }

  update(time: number) {
    if (this.actions.length === 0 && !this.activeAction) {
      this._finished = true;

      return;
    }

    if (!this.activeAction) this.activeAction = this.actions.shift();

    if (!this.activeAction.inProgress) {
      this.activeAction.start();
    } else {
      this.activeAction.update(time);
    }

    if (this.activeAction.finished) {
      this.activeAction = null;
    }
  }
}
