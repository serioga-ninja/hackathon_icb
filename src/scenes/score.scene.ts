export class ScoreScene extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  text: Phaser.GameObjects.Text;
  tryAgain: Phaser.GameObjects.Text;
  leaderBoard: Phaser.GameObjects.Text;
  name: Phaser.GameObjects.Text;
  score: Phaser.GameObjects.Text;
  points: Phaser.GameObjects.Text;

  point: number = 150;
  reason: string = 'Some Strange reason';

  heroName: string = 'Andrii';
  heroPoint: string = '765';

  leaderBoardData = [
    {
      heroName: 'Andrii 1',
      heroPoint: 765
    }, {
      heroName: 'Andrii 2',
      heroPoint: 123
    },{
      heroName: 'Andrii 3',
      heroPoint: 555
    },{
      heroName: 'Andrii 4',
      heroPoint: 996
    },
  ];

  constructor() {
    super({
      key: 'ScoreScene'
    });
  }

  create(): void {
    this.title = this.add.text(500, 200, 'You Died', { font: '100px Arial Bold', fill: '#de0025' });
    this.text = this.add.text(500, 350, 'Click to start', { font: '24px Arial Bold', fill: '#adc100' });

    this.name = this.add.text(500, 550, 'Name', { font: '24px Arial Bold', fill: '#00c133' });
    this.points = this.add.text(750, 550, 'Score', { font: '24px Arial Bold', fill: '#00c133' });

    for (let player in this.leaderBoard) {
      this.getPlayer();
    }


    this.tryAgain = this.add.text(500, 450, 'Score Board', { font: '50px Arial Bold', fill: '#de0025' });
    // this.clickToStart = this.add.text(500, 550, 'Click to start', { font: '24px Arial Bold', fill: '#adc100' });

    this.text.setText([
      'Score: ' + this.point,
      'Reason: ' + this.reason,
    ]);


    this.tryAgain.on('pointerdown', function (/*pointer*/) {
      this.scene.start('GameScene');
    }, this);
  }

  getPlayer() {
    for (let player in this.leaderBoard) {
      return this.add.text(750, 550, 'Score', { font: '24px Arial Bold', fill: '#00c133' });
    }

  }
}
