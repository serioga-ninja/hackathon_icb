export class WelcomeScene extends Phaser.Scene {
  private audio: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: 'WelcomeScene'
    });
  }

  preload(): void {
    this.load.image('start', 'textures/game/start.jpg');
    this.load.audio('startAudio', 'sounds/start.ogg');
  }

  create(): void {
    let width = this.cameras.main.width,
        height = this.cameras.main.height,
        image = this.add.image(width / 2, height / 2, 'start'),
        scale = Math.max(width / image.width, height / image.height);

    image.setScale(scale).setScrollFactor(0);

    this.audio = this.sound.add('startAudio', {volume: 0.3, loop: true});
    this.audio.play();

    this.input.on('pointerdown', function (/*pointer*/) {
      this.audio.stop();
      this.scene.start('ScoreScene');
    }, this);
  }
}
