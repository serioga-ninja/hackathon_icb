export interface IGameStats {
  electricity: number;
}

export class GameStats {

  stats: IGameStats;

  constructor() {
    this.stats = {} as IGameStats;
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

}
