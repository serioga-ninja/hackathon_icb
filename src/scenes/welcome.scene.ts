import { textures, audio, gameConfig, tileSize } from '../core/game.config';
import { MuteButtonEntity } from '../entity/mute-button.entity';

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
    new MuteButtonEntity(this, tileSize * 27, tileSize * 1.2);

    let width = this.cameras.main.width,
      height = this.cameras.main.height,
      image = this.add.image(width / 2, height / 2, 'start'),
      scale = Math.max(width / image.width, height / image.height);

    image.setScale(scale).setScrollFactor(0);

    this.audio = this.sound.add('startAudio', { volume: 0.1, loop: true });
    this.audio.play();

    let playBtn = this.add.image(tileSize * 22, tileSize * 10, 'tile').setInteractive();
    playBtn.setScale(scale);

    playBtn.on('pointerdown', function (/*pointer*/) {
      this.scene.stop();

      this.audio.stop();

      this.scene.start('GameScene');
    }, this);
  }
}
