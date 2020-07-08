import gameConfig from '../core/game.config';
import { GameSceneProperties } from '../properties/game-scene.properties';
import { NavigationLogic } from '../core/navigation.logic';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';

export enum EHumanState {
  waiting,
  moving
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

  set state(state: EHumanState) {
    this._state = state;

    if (state === EHumanState.waiting) {
      this.setTexture('human');
    }
  }

  private _state: EHumanState;
  private _navigationLogic: NavigationLogic;
  private _currentFlatEntity: FlatBlockEntity;
  private _movingAnimationTime: number;

  public follower: Phaser.GameObjects.PathFollower;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IHumanEntityOptions) {
    super(scene, x, y, key);

    this._state = EHumanState.waiting;
    this._navigationLogic = options.navigationLogic;
    this.setDisplaySize(GameSceneProperties.tileSize, GameSceneProperties.tileSize);
    this.currentFlatEntity = options.startBlock;
    this.setData('speed', 3);
    this.follower = new Phaser.GameObjects.PathFollower(scene, null, x, y, key);
    this.follower.setVisible(false);
    this.angle = 180;
    this._movingAnimationTime = 0;
  }

  update(time: number) {
    switch (this._state) {
      case EHumanState.moving:
        if (time - this._movingAnimationTime > 200) {
          if (this.texture.key === 'human-go-2') {
            this.setTexture('human-go-1');
          } else {
            this.setTexture('human-go-2');
          }

          this._movingAnimationTime = time;
        }
        break;
    }
  }
}
