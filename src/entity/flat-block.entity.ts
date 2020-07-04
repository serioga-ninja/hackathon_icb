import { SpriteEntity } from '../core/sprite.entity';


export class FlatBlockEntity extends SpriteEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.setDisplaySize(100, 100);
  }

}
