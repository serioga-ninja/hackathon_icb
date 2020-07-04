import { SpriteEntity } from '../core/sprite.entity';

export enum EHumanState {
  waiting
}

export class HumanEntity extends SpriteEntity {

  private _state: EHumanState;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this._state = EHumanState.waiting;
  }


}
