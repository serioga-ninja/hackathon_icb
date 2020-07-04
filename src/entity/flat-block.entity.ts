import gameConfig from '../core/game.config';
import { Point } from '../core/point';
import { SpriteEntity } from '../core/sprite.entity';

export interface IFlatBlockOptions {
  width: number;
  height: number;
  blockType: EHouseParticles;
  matrix: { x: number; y: number; };
}

export enum EHouseParticles {
  WallVertical,
  WallHorizontal,
  FreeSpace,
  WindowHorizontal,
  WindowVertical,
  Door,
}

const pathAvailableBlockTypes: EHouseParticles[] = [
  EHouseParticles.FreeSpace, EHouseParticles.Door
];

export class FlatBlockEntity extends SpriteEntity {

  private readonly _position: Point;
  private _waveValue: number;

  public readonly blockType: EHouseParticles;
  public relatedMovableBlocks: FlatBlockEntity[];


  public readonly isDoor: boolean;
  public readonly isMovable: boolean;
  public matrix: { x: number; y: number; };

  get waveValue() {
    return this._waveValue;
  }

  set waveValue(value) {
    this._waveValue = value;

    if (typeof value === 'number' && gameConfig.debug) {
      this.scene.add.text(this.position.x, this.position.y, value.toString(), {
        font: '10px Arial Bold',
        fill: '#de0025'
      });
    }
  }

  get position() {
    return this._position;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IFlatBlockOptions) {
    super(scene, x, y, key);

    this._position = new Point(x, y);
    this.blockType = options.blockType;
    this.setDisplaySize(options.width, options.height);
    this.isMovable = pathAvailableBlockTypes.indexOf(options.blockType) !== -1;
    this.isDoor = options.blockType === EHouseParticles.Door;
    this.matrix = options.matrix;
  }

}
