import { GameStats } from '../core/game.stats';
import { HumanEntity } from '../entity/human.entity';

export abstract class HumanActionBase {
  public gameStats?: GameStats;

  protected human: HumanEntity;
  protected _finished: boolean;

  inProgress: boolean;

  get finished() {
    return this._finished;
  }

  constructor(human: HumanEntity, gameStats?: GameStats) {
    this.human = human;
    this.gameStats = gameStats;
    this._finished = false;
    this.inProgress = false;
  }

  abstract start(): void;

  abstract update(time: number): void;

  finish() {
    this._finished = true;
  }
}
