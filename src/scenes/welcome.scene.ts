import { textures, audio, gameConfig } from '../core/game.config';
import { MuteButtonEntity } from '../entity/mute-button.entity';

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
    new MuteButtonEntity(this);
    let width = this.cameras.main.width,
      height = this.cameras.main.height,
      image = this.add.image(width / 2, height / 2, 'start'),
      scale = Math.max(width / image.width, height / image.height);

    image.setScale(scale).setScrollFactor(0);

    this.audio = this.sound.add('startAudio', { volume: 0.1, loop: true });
    this.audio.play();

    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.stop();

      this.audio.stop();

      this.scene.start('GameScene');
    }, this);
  }
}
