import { gameConfig, tileSize } from "../core/game.config";

export class ScoreScene extends Phaser.Scene {
  private playerRankList: string = "";
  private playerNameList: string = "";
  private playerScoreList: string = "";
  private audio: Phaser.Sound.BaseSound;

  name: Phaser.GameObjects.BitmapText;
  rank: Phaser.GameObjects.BitmapText;
  score: Phaser.GameObjects.BitmapText;

  playerRankPosition: Phaser.GameObjects.BitmapText;
  playerName: Phaser.GameObjects.BitmapText;
  playerScore: Phaser.GameObjects.BitmapText;

  point: number = 150;

  leaderBoardData = [
    {
      heroName: 'Andrii 1',
      heroPoint: 765,
    }, {
      heroName: 'Andrii 2',
      heroPoint: 123,
    },{
      heroName: 'Andrii 3',
      heroPoint: 555,
    },{
      heroName: 'Andrii 4',
      heroPoint: 996,
    },
  ];

  constructor() {
    super({
      key: 'ScoreScene'
    });
  }

  create(): void {
    let width = this.cameras.main.width,
      height = this.cameras.main.height,
      bg = this.add.image(width / 2, height / 2, 'final'),
      scale = Math.max(width / bg.width, height / bg.height);

    if (gameConfig.allowMusic) {
      this.audio = this.sound.add('endAudio', {volume: 0.2, loop: true});
      this.audio.play();
    }

    bg.setScale(scale).setScrollFactor(0);

    let scoreImg = this.add.image(tileSize * 10, tileSize * 4, 'score');
    scoreImg.setScale(scale);

    let leaderboardImg = this.add.image(tileSize * 10, tileSize * 10, 'leaderboard');
    leaderboardImg.setScale(scale);

    let replayImg = this.add.image(1375,725, 'replay').setInteractive();
    replayImg.setScale(scale);

    this.add.bitmapText(300, 375, 'font', `YOUR SCORE: ${this.point}`, 50);
    this.add.bitmapText(350, 525, 'font', `LEADERBOARD`, 50);
    this.add.bitmapText(335, 600, 'font', `Leaderboard coming soon...`, 25);


    replayImg.on('pointerdown', function (/*pointer*/) {
      this.scene.stop();

      if (gameConfig.allowMusic) {
        this.audio.stop();
      }

      this.scene.start('GameScene');
    }, this);

  //   // Leader Board with table
  //   this.rank = this.add.bitmapText(100, 600, 'font', 'RANK', 25);
  //   this.name = this.add.bitmapText(225, 600, 'font', 'NAME', 25);
  //   this.score = this.add.bitmapText(600, 600, 'font', 'SCORE', 25);
  //
  //   this.makeScoreBoardGrid();
  //
  //   this.playerRankPosition = this.add.bitmapText(100, 650,'font', this.playerRankList, 20);
  //   this.playerName = this.add.bitmapText(225, 650, 'font', this.playerNameList, 20);
  //   this.playerScore = this.add.bitmapText(600, 650, 'font', this.playerScoreList, 20);
  }

  makeScoreBoardGrid(): void  {
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

      this.playerRankList += rankPosition + "\n";
      this.playerNameList += plaer.heroName + "\n";
      this.playerScoreList += plaer.heroPoint + "\n";
    });
  }
}
