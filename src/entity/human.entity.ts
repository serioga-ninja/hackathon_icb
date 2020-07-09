import { gameConfig } from '../core/game.config';
import { NavigationLogic } from '../core/navigation.logic';
import { SpriteEntity } from '../core/sprite.entity';
import { GarbageGroup } from '../groups/garbage.group';
import { FlatBlockEntity } from './flat-block.entity';
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY;
import { tileSize } from '../core/game.config';
import { HumanMessageEntity } from './human-message.entity';

export enum EHumanState {
  waiting,
  moving
}

export interface IHumanEntityOptions {
  navigationLogic: NavigationLogic;
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

  public overlapBlock: FlatBlockEntity;

  private _humanMessage: HumanMessageEntity;
  private _state: EHumanState;
  private _navigationLogic: NavigationLogic;
  private _garbageGroup: GarbageGroup;
  private _currentFlatEntity: FlatBlockEntity;
  private _movingAnimationTime: number;

  public dead: boolean;

  constructor(scene: Phaser.Scene, startBlock: FlatBlockEntity, navigationLogic: NavigationLogic, garbageGroup: GarbageGroup) {
    super(scene, startBlock.x, startBlock.y, 'human');

    this._state = EHumanState.waiting;
    this._navigationLogic = navigationLogic;
    this._garbageGroup = garbageGroup;
    this.setDisplaySize(tileSize, tileSize);
    this.currentFlatEntity = startBlock;
    this.setData('speed', 3);
    this.scene.physics.world.enableBody(this, DYNAMIC_BODY);
    this.angle = 180;
    this.alpha = 1;
    this._movingAnimationTime = 0;
    this.dead = false;

    // left garbage
    setInterval(() => {
      this._garbageGroup.throwGarbage(this.overlapBlock);
    }, gameConfig.throwGarbageOncePerSec * 1000);
  }

  update(time: number) {
    switch (this._state) {
      case EHumanState.moving:
        if (this._humanMessage) {
          this._humanMessage.updatePosition(this);
        }

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

  say(message: string, width: number, height: number, liveTime: number = 5000) {
    if (this._humanMessage && this._humanMessage.message === message) return;

    if (this._humanMessage) {
      this._humanMessage.destroy(true);
    }

    this._humanMessage = new HumanMessageEntity(this.scene, this, width, height, liveTime, message);
    this._humanMessage.draw();
  }
}
