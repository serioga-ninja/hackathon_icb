import { textures, audio } from "../core/game.config";

export class WelcomeScene extends Phaser.Scene {
  private audio: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: 'WelcomeScene'
    });
  }

  preload(): void {
    textures.forEach((texture: any) => {
      this.load.image(texture.key, texture.path);
    });

    audio.forEach((sound: any) => {
      this.load.audio(sound.key, sound.path);
    });

    this.load.bitmapFont('font', 'font/gem.png', 'font/gem.xml');
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
      this.scene.stop();
      this.audio.stop();
      this.scene.start('GameScene');
    }, this);
  }
}
