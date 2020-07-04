import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';

export enum EHumanState {
  waiting
}

export class HumanEntity extends SpriteEntity {

  private _state: EHumanState;
  private _moveToPoint: FlatBlockEntity;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this._state = EHumanState.waiting;
  }

  public moveTo(point: FlatBlockEntity) {
    this._moveToPoint = point;
  }

}
