export class WelcomeScene extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'WelcomeScene'
    });
  }

  create(): void {
    this.title = this.add.text(100, 200, 'Smart House Survival', { font: '100px Arial Bold', fill: '#de0025' });
    this.hint = this.add.text(500, 350, 'Click to start', { font: '24px Arial Bold', fill: '#adc100' });
    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start('GameScene');
    }, this);
  }
}
