import { GameSceneProperties } from '../properties/game-scene.properties';
import { SpriteEntity } from '../core/sprite.entity';

export class DeviceEntity extends SpriteEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.setDisplaySize(GameSceneProperties.tileSize, GameSceneProperties.tileSize);
    this.alpha = 1;

    this.setInteractive();
  }
}
