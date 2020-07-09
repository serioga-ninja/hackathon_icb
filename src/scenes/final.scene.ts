export class FinalScene extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  text: Phaser.GameObjects.Text;
  tryAgain: Phaser.GameObjects.Text;
  leaderBoard: Phaser.GameObjects.Text;

  point: number = 150;
  reason: string = 'Some Strange reason';

  constructor() {
    super({
      key: 'FinalScene'
    });
  }

  create(): void {
    this.title = this.add.text(500, 200, 'You Died', { font: '100px Arial Bold', fill: '#de0025' }).setInteractive();

    setTimeout(() => {
      this.scene.start('ScoreScene');
    }, 2000)

  }
}
