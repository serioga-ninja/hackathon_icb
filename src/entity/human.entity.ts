import { gameConfig } from '../core/game.config';
import { ICanSay } from '../core/interfaces';
import { NavigationLogic } from '../core/navigation.logic';
import { SpriteEntity } from '../core/sprite.entity';
import { GarbageGroup } from '../groups/garbage.group';
import { FlatBlockEntity } from './flat-block.entity';
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY;
import { tileSize } from '../core/game.config';
import { MessageEntity } from './message.entity';

export enum EHumanState {
  waiting,
  moving,
  siting
}

export class HumanEntity extends SpriteEntity implements ICanSay {
  get finalSceneInProgress(): boolean {
    return this._finalSceneInProgress;
  }

  set finalSceneInProgress(value: boolean) {
    this._finalSceneInProgress = value;

    if (value && this._humanMessage) {
      this._humanMessage.destroy(true);
      this._humanMessage = null;
    }
  }

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

    switch (state) {
      case EHumanState.waiting:
        this.setTexture('human');
        break;
      case EHumanState.siting:
        this.setTexture('human-sit');
    }
  }

  get hasMessage() {
    return !!this._humanMessage;
  }

  public overlapBlock: FlatBlockEntity;

  private _finalSceneInProgress: boolean;
  private _humanMessage: MessageEntity;
  private _state: EHumanState;
  private _navigationLogic: NavigationLogic;
  private _garbageGroup: GarbageGroup;
  private _currentFlatEntity: FlatBlockEntity;
  private _movingAnimationTime: number;
  private _garbage;

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
    this._finalSceneInProgress = false;

    // left garbage
    this._garbage = setInterval(() => {
      this._garbageGroup.throwGarbage(this.overlapBlock);
    }, gameConfig.throwGarbageOncePerSec * 1000);
  }

  update(time: number) {
    if (this.dead) return;

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

  say(message: string, width: number, height: number, liveTime: number = 5000, force: boolean = false) {
    if (this.dead) return;
    if (this._finalSceneInProgress && !force) return;

    if (this._humanMessage && this._humanMessage.message === message) return;

    if (this._humanMessage) {
      this._humanMessage.destroy(true);
    }

    this._humanMessage = new MessageEntity(this.scene, this, width, height, liveTime, message);
    this._humanMessage.draw();
  }

  messageDestroyed() {
    this._humanMessage = null;
  }

  kill() {
    if (this._humanMessage) {
      this._humanMessage.destroy(true);
      this._humanMessage = null;
    }
    if (this._garbage) {
      clearTimeout(this._garbage);
    }

    this.dead = true;
    this.setTexture('suicide');
    this.anims.play('die');
  }
}
