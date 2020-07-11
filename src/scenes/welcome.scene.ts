import { textures, audio, gameConfig } from "../core/game.config";

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

    if (gameConfig.allowMusic) {
      this.audio = this.sound.add('startAudio', {volume: 0.1, loop: true});
      this.audio.play();
    }

    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.stop();

      if (gameConfig.allowMusic) {
        this.audio.stop();
      }
      
      this.scene.start('GameScene');
    }, this);
  }
}
