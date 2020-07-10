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
  }

  create(): void {
    let width = this.cameras.main.width,
        height = this.cameras.main.height,
        image = this.add.image(width / 2, height / 2, 'start'),
        scale = Math.max(width / image.width, height / image.height);

    image.setScale(scale).setScrollFactor(0);

    this.audio = this.sound.add('startAudio', {volume: 0.4});
    this.audio.play();
    this.audio.resume();

    this.input.on('pointerdown', function (/*pointer*/) {
      this.audio.stop();
      this.scene.start('GameScene');
    }, this);
  }
}
