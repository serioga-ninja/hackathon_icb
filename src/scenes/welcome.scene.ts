import { textures, audio, gameConfig, tileSize } from '../core/game.config';
import { MuteButtonEntity } from '../entity/mute-button.entity';

export enum Emode {
  Easy = 1,
  Difficult = 2
}

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

    let easyModeBtn = this.add.image(tileSize * 20.5, tileSize * 11.5, 'easy').setInteractive();
    easyModeBtn.setScale(scale);

    let hardModeBtn = this.add.image(tileSize * 20.5, tileSize * 13, 'difficult').setInteractive();
    hardModeBtn.setScale(scale);

    easyModeBtn.on('pointerdown', function (/*pointer*/) {
      this.runGameWithMode(Emode.Easy);
    }, this);

    hardModeBtn.on('pointerdown', function (/*pointer*/) {
      this.runGameWithMode(Emode.Difficult);
    }, this);
  }

  runGameWithMode(mode: EMode) {
    this.scene.stop();
    this.audio.stop();
    gameConfig.levelMultiplier = mode;
    this.scene.start('GameScene');
  }
}
