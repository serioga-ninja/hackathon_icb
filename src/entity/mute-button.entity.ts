import { gameConfig } from '../core/game.config';
import { SpriteEntity } from '../core/sprite.entity';

export class MuteButtonEntity extends SpriteEntity {

  private allowMusic: boolean;

  constructor(scene: Phaser.Scene) {
    super(scene, 50, 50, 'music-on');

    this.allowMusic = gameConfig.allowMusic;

    this.scene.sound.mute = !this.allowMusic;
    this.setInteractive();
    this.depth = 5000;

    this.on('pointerdown', () => {
      this.toggleMute();
    });
  }

  toggleMute() {
    this.allowMusic = !this.allowMusic;
    this.scene.sound.mute = !this.allowMusic;

    this.setTexture(this.allowMusic ? 'music-on' : 'music-off');
  }
}
