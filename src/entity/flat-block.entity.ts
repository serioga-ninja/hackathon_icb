import { Point } from '../core/point';
import { SpriteEntity } from '../core/sprite.entity';

export interface IFlatBlockOptions {
  width: number;
  height: number;
  blockType: EHouseParticles;
}

export enum EHouseParticles {
  Wall,
  FreeSpace,
  Window,
  Door,
}

export class FlatBlockEntity extends SpriteEntity {

  private readonly _blockType: EHouseParticles;
  private readonly _position: Point;

  get position() {
    return this._position;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IFlatBlockOptions) {
    super(scene, x, y, key);

    this._position = new Point(x, y);
    this._blockType = options.blockType;
    this.setDisplaySize(options.width, options.height);
  }

}
