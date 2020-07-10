export class ScoreScene extends Phaser.Scene {
  private readonly LINESPACING: number = 12;
  private readonly SCOREBOARDSTYLE = { font: "18px Arial", fill: "#adc100", align: "left" };
  private playerRankList: string = "";
  private playerNameList: string = "";
  private playerScoreList: string = "";

  title: Phaser.GameObjects.Text;
  text: Phaser.GameObjects.Text;
  tryAgain: Phaser.GameObjects.Text;
  name: Phaser.GameObjects.Text;
  rank: Phaser.GameObjects.Text;
  score: Phaser.GameObjects.Text;

  playerRankPosition: Phaser.GameObjects.Text;
  playerName: Phaser.GameObjects.Text;
  playerScore: Phaser.GameObjects.Text;

  point: number = 150;
  reason: string = 'Some Strange reason';

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
    this.title = this.add.text(500, 200, 'You Died', { font: '100px Arial Bold', fill: '#de0025' });
    this.text = this.add.text(500, 350, '', { font: '24px Arial Bold', fill: '#adc100' });

    this.tryAgain = this.add.text(500, 450, 'Score Board', { font: '50px Arial Bold', fill: '#de0025' });
    this.rank = this.add.text(500, 550, 'Rank', { font: '24px Arial Bold', fill: '#00c133' });
    this.name = this.add.text(600, 550, 'Name', { font: '24px Arial Bold', fill: '#00c133' });
    this.score = this.add.text(700, 550, 'Score', { font: '24px Arial Bold', fill: '#00c133' });

    this.makeScoreBoardGrid();

    this.playerRankPosition = this.add.text(500, 600, this.playerRankList, this.SCOREBOARDSTYLE);
    this.playerName = this.add.text(600, 600, this.playerNameList, this.SCOREBOARDSTYLE);
    this.playerScore = this.add.text(700, 600, this.playerScoreList, this.SCOREBOARDSTYLE);
    this.playerRankPosition.lineSpacing = this.playerName.lineSpacing = this.playerScore.lineSpacing = this.LINESPACING;

    this.text.setText([
      'Score: ' + this.point,
      'Reason: ' + this.reason,
    ]);


    this.tryAgain.on('pointerdown', function (/*pointer*/) {
      this.scene.start('GameScene');
    }, this);
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
