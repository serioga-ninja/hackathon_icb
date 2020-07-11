import { gameConfig } from './game.config';

export interface IGameStats {
  electricity: number;
  water: number;
  humanMood: number;
  money: number;
  score: number;
}

export interface ILeaderBoard {

}

let instance: GameStats;

export class GameStats {

  static get instance(): GameStats {
    return instance || (instance = new GameStats());
  }


  private leaderBoards: ILeaderBoard[];
  private stats: IGameStats;

  constructor() {
    this.stats = {
      humanMood: gameConfig.initialMood,
      money: gameConfig.initialMoney,
    } as IGameStats;
  }

  getStat<K extends keyof IGameStats>(key: K): IGameStats[K] {
    if (this.stats[key] === undefined) {
      this.stats[key] = 0;
    }

    return this.stats[key];
  }

  updateStat<K extends keyof IGameStats>(key: K, value: number) {
    this.stats[key] = value;
  }

  addToStat<K extends keyof IGameStats>(key: K, value: number) {
    if (typeof this.stats[key] !== 'number') {
      this.stats[key] = value;
    } else {
      this.stats[key] += value;
    }
  }

  decreaseToStat<K extends keyof IGameStats>(key: K, value: number) {
    if (typeof this.stats[key] !== 'number') {
      this.stats[key] = value;
    } else {
      this.stats[key] -= value;
    }
  }

  reset() {
    this.stats = {
      humanMood: gameConfig.initialMood,
      money: gameConfig.initialMoney,
      electricity: 0,
      water: 0,
      score: 0
    };
  }

  updateLeaderBoard(leaderBoards: ILeaderBoard[]) {
    this.leaderBoards = leaderBoards;
  }

}
