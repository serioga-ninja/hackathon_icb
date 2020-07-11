import { gameConfig } from './game.config';

export interface IGameStats {
  electricity: number;
  water: number;
  humanMood: number;
  money: number;
  score: number;
}

export interface ILeaderBoard {
  heroName: string;
  heroPoint: number;
}

let instance: GameStats;

export class GameStats {
  get leaderBoards(): ILeaderBoard[] {
    return this._leaderBoards;
  }

  static get instance(): GameStats {
    return instance || (instance = new GameStats());
  }


  private _leaderBoards: ILeaderBoard[];
  private stats: IGameStats;

  constructor() {
    this.stats = {
      humanMood: gameConfig.initialMood,
      money: gameConfig.initialMoney,
    } as IGameStats;

    this._leaderBoards = [ // dummy data
      {
        heroName: 'Andrii 1',
        heroPoint: 765,
      }, {
        heroName: 'Andrii 2',
        heroPoint: 123,
      }, {
        heroName: 'Andrii 3',
        heroPoint: 555,
      }, {
        heroName: 'Andrii 4',
        heroPoint: 996,
      },
    ];
  }

  getStat<K extends keyof IGameStats>(key: K): IGameStats[K] {
    if (this.stats[key] === undefined) {
      this.stats[key] = 0;
    }

    return this.stats[key];
  }

  addToStat<K extends keyof IGameStats>(key: K, value: number) {
    if (typeof this.stats[key] !== 'number') {
      this.stats[key] = value;
    } else {
      this.stats[key] += value;
    }
  }

  decreaseToStat<K extends keyof IGameStats>(key: K, value: number) {
    value = value * gameConfig.levelMultiplier;

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

  updateLeaderBoard(leaderBoards: ILeaderBoard[] = []) {
    this._leaderBoards = leaderBoards;
  }

}
