export interface IGameStats {
  electricity: number;
  water: number;
  humanMood: number;
  money: number;
}

export class GameStats {

  stats: IGameStats;

  constructor() {
    this.stats = {
      humanMood: 100,
      money: 100,
    } as IGameStats;
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

    console.log(key, this.stats[key]);
  }

  decreaseToStat<K extends keyof IGameStats>(key: K, value: number) {
    if (typeof this.stats[key] !== 'number') {
      this.stats[key] = value;
    } else {
      this.stats[key] -= value;
    }
    console.log(key, this.stats[key]);
  }

}
