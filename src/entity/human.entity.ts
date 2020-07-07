import gameConfig from '../core/game.config';
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
  get currentFlatEntity(): FlatBlockEntity {
    return this._currentFlatEntity;
  }

  set currentFlatEntity(value: FlatBlockEntity) {
    if (this._currentFlatEntity) this._currentFlatEntity.clearTint();

    this._currentFlatEntity = value;

    if (gameConfig.debug) {
      value.setTint(0xff0000);
    }
  }

  private _state: EHumanState;
  private _navigationLogic: NavigationLogic;
  private _currentFlatEntity: FlatBlockEntity;

  public follower: Phaser.GameObjects.PathFollower;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IHumanEntityOptions) {
    super(scene, x, y, key);

    this._state = EHumanState.waiting;
    this._navigationLogic = options.navigationLogic;
    this.setDisplaySize(15, 15);
    this.currentFlatEntity = options.startBlock;
    this.setData('speed', 3);
    this.follower = new Phaser.GameObjects.PathFollower(scene, null, x, y, key);
    this.follower.setVisible(false);
  }

  update() {
  }
}
