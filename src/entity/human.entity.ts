import { MoveToWraper } from '../core/move-to-wraper';
import { NavigationLogic } from '../core/navigation.logic';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';

export enum EHumanState {
  waiting
}

export interface IHumanEntityOptions {
  navigationLogic: NavigationLogic;
  startBlock: FlatBlockEntity;
}

export class HumanEntity extends SpriteEntity {

  private _state: EHumanState;
  private _moveToFlatEntity: MoveToWraper;
  private _path: FlatBlockEntity[];
  private _actions: any[];
  private _navigationLogic: NavigationLogic;
  private _currentFlatEntity: FlatBlockEntity;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IHumanEntityOptions) {
    super(scene, x, y, key);

    this._state = EHumanState.waiting;
    this._navigationLogic = options.navigationLogic;
    this.setDisplaySize(15, 15);
    this._currentFlatEntity = options.startBlock;
    this.setData('speed', 2);
  }

  public setMoveToPoint(block: FlatBlockEntity) {
    this._path = this._navigationLogic.generatePath(this._currentFlatEntity, block);
    this._moveToFlatEntity = new MoveToWraper(this._currentFlatEntity, this._path.pop());
  }

  update() {
    if (this._moveToFlatEntity) {
      if (this._moveToFlatEntity.bottom) {
        this.y -= this.getData('speed');
      }
      if (this._moveToFlatEntity.top) {
        this.y += this.getData('speed');
      }
      if (this._moveToFlatEntity.right) {
        this.x += this.getData('speed');
      }
      if (this._moveToFlatEntity.left) {
        this.x -= this.getData('speed');
      }

      if (this.widthTo(this._moveToFlatEntity.moveToPosition) < 2) {
        const nextBlock = this._path.pop();

        if (nextBlock) {
          this._currentFlatEntity = this._moveToFlatEntity.moveToPosition;
          this._moveToFlatEntity = new MoveToWraper(this._currentFlatEntity, nextBlock);
        } else {
          this._moveToFlatEntity = null;
        }
      }
    }
  }

}
