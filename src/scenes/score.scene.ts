import { tileSize } from '../core/game.config';
import { GameStats, ILeaderBoard } from '../core/game.stats';
import { MuteButtonEntity } from '../entity/mute-button.entity';

export class ScoreScene extends Phaser.Scene {
  private playerRankList: string = '';
  private playerNameList: string = '';
  private playerScoreList: string = '';

  name: Phaser.GameObjects.BitmapText;
  rank: Phaser.GameObjects.BitmapText;
  score: Phaser.GameObjects.BitmapText;

  playerRankPosition: Phaser.GameObjects.BitmapText;
  playerName: Phaser.GameObjects.BitmapText;
  playerScore: Phaser.GameObjects.BitmapText;

  point: number = 0;

  leaderBoardData: ILeaderBoard[];

  constructor() {
    super({
      key: 'ScoreScene'
    });
  }

  init() {
    this.leaderBoardData = GameStats.instance.leaderBoards;
  }

  create(): void {
    new MuteButtonEntity(this, tileSize * 27, tileSize * 1.2);

    let width = this.cameras.main.width,
      height = this.cameras.main.height,
      bg = this.add.image(width / 2, height / 2, 'final'),
      scale = Math.max(width / bg.width, height / bg.height);

    bg.setScale(scale).setScrollFactor(0);

    let scoreImg = this.add.image(tileSize * 10, tileSize * 4, 'score');
    scoreImg.setScale(scale);

    let leaderboardImg = this.add.image(tileSize * 10, tileSize * 10, 'leaderboard');
    leaderboardImg.setScale(scale);

    let replayImg = this.add.image(tileSize * 22, tileSize * 10, 'replay').setInteractive();
    replayImg.setScale(scale);

    this.add.bitmapText(tileSize * 6.5, tileSize * 3.5, 'font', `YOUR SCORE: ${GameStats.instance.getStat('score')}`, 50);
    this.add.bitmapText(tileSize * 6.6, tileSize * 6.3, 'font', `LEADERBOARD`, 50);
    //this.add.bitmapText(tileSize * 6.4, tileSize * 7.5, 'font', `Leaderboard coming soon...`, 25);


    replayImg.on('pointerdown', function (/*pointer*/) {
      this.scene.stop();

      this.scene.start('GameScene');
    }, this);

      // Leader Board with table
      this.rank = this.add.bitmapText(tileSize * 4, tileSize * 8, 'font', 'RANK', 25);
      this.name = this.add.bitmapText(tileSize * 6, tileSize * 8, 'font', 'NAME', 25);
      this.score = this.add.bitmapText(tileSize * 12, tileSize * 8, 'font', 'SCORE', 25);

      this.makeScoreBoardGrid();

      this.playerRankPosition = this.add.bitmapText(tileSize * 4, tileSize * 9,'font', this.playerRankList, 20);
      this.playerName = this.add.bitmapText(tileSize * 6, tileSize * 9, 'font', this.playerNameList, 20);
      this.playerScore = this.add.bitmapText(tileSize * 12, tileSize * 9, 'font', this.playerScoreList, 20);
  }

  makeScoreBoardGrid(): void {
    this.leaderBoardData.sort((a, b) => {
      return b.heroPoint - a.heroPoint;
    });

    this.leaderBoardData.forEach((plaer, index) => {
      let rank = index + 1;
      let rankPosition = '';
      if (rank == 1) {
        rankPosition = rank + 'st'
      } else if (rank == 2) {
        rankPosition = rank + 'nd'
      } else if (rank == 3) {
        rankPosition = rank + 'rd'
      } else {
        rankPosition = rank + 'th '
      }

      this.playerRankList += rankPosition + '\n';
      this.playerNameList += plaer.heroName + '\n';
      this.playerScoreList += plaer.heroPoint + '\n';
    });
  }
}
