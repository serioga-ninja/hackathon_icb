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

  private readonly _position: Point;

  public readonly blockType: EHouseParticles;

  get position() {
    return this._position;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IFlatBlockOptions) {
    super(scene, x, y, key);

    this._position = new Point(x, y);
    this.blockType = options.blockType;
    this.setDisplaySize(options.width, options.height);
  }

}
