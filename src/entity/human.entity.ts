import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';

export enum EHumanState {
  waiting
}

export interface IHumanEntityOptions {
  startBlockEntity: FlatBlockEntity;
}

export class HumanEntity extends SpriteEntity {

  private _state: EHumanState;
  private _moveToPoint: FlatBlockEntity;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IHumanEntityOptions) {
    super(scene, x, y, key);

    this._state = EHumanState.waiting;
    this.setDisplaySize(80, 80);
    this.body.velocity.y = options.startBlockEntity.position.y;
    this.body.velocity.x = options.startBlockEntity.position.x;
  }

  public moveTo(point: FlatBlockEntity) {
    this._moveToPoint = point;
  }

}
