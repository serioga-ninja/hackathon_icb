import { gameConfig, tileSize } from '../core/game.config';
import { SpriteEntity } from '../core/sprite.entity';

export class MuteButtonEntity extends SpriteEntity {

  private allowMusic: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'soundOn');

    this.allowMusic = gameConfig.allowMusic;

    this.scene.sound.mute = !this.allowMusic;
    this.setInteractive();
    this.depth = 5000;
    this.setScale(.25);

    this.on('pointerdown', () => {
      this.toggleMute();
    });
  }

  toggleMute() {
    this.allowMusic = !this.allowMusic;
    this.scene.sound.mute = !this.allowMusic;

    this.setTexture(this.allowMusic ? 'soundOn' : 'soundOff');
  }
}
