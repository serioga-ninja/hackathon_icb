import { textures, audio, gameConfig, tileSize } from '../core/game.config';
import { MuteButtonEntity } from '../entity/mute-button.entity';

export enum Emode {
  Easy = 1,
  Difficult = 3
}

export class WelcomeScene extends Phaser.Scene {
  private audio: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: 'WelcomeScene'
    });
  }

  preload(): void {
    let assetsFolder = "";

    //handling different asset folders 
    //launched from parcel(localhost:1234) ENV = development
    //launched from electron(standalone app) ENV = production
    if (process.env.NODE_ENV !== 'development') {
      assetsFolder = "assets//";
    }


    this.load.image('start', assetsFolder + 'textures/game/start.jpg');
    this.load.audio('startAudio', assetsFolder + 'sounds/start.ogg');
    textures.forEach((texture: any) => {
      this.load.image(texture.key, assetsFolder + texture.path);
    });

    audio.forEach((sound: any) => {
      this.load.audio(sound.key, assetsFolder + sound.path);
    });

    this.load.bitmapFont('font', assetsFolder + 'font/gem.png', assetsFolder + 'font/gem.xml');
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
