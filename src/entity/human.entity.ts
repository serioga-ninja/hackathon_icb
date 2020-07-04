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
  private _moveToPoint: FlatBlockEntity;
  private _path: FlatBlockEntity[];
  private _actions: any[];
  private _navigationLogic: NavigationLogic;
  private _currentBlock: FlatBlockEntity;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IHumanEntityOptions) {
    super(scene, x, y, key);

    this._state = EHumanState.waiting;
    this._navigationLogic = options.navigationLogic;
    this.setDisplaySize(80, 80);
    this._currentBlock = options.startBlock;
  }

  private calculatePath() {
    this._path = [];

  }

  public setMoveToPoint(block: FlatBlockEntity) {
    this._moveToPoint = block;
    this._path = this._navigationLogic.generatePath(this._currentBlock, block);
  }

}
