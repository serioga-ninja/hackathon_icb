import { DeviceType } from '../actions/action-group.base';
import { gameConfig } from '../core/game.config';
import { VACUUM_CLEAN_DONE, VACUUM_EVIL_MODE_ACTIVATED } from '../core/game.vocabulary';
import { ICanSay, IElectricityObject } from '../core/interfaces';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { NavigationLogic } from '../core/navigation.logic';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { GarbageEntity } from '../entity/garbage.entity';
import { HumanEntity } from '../entity/human.entity';
import { MessageEntity } from '../entity/message.entity';
import { GarbageGroup } from '../groups/garbage.group';
import { MovableBlocksGroup } from '../groups/movable-blocks.group';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY;

export class Vacuum extends DeviceInteractiveEntity implements IElectricityObject, ICanSay {

  placeToInteract: null;
  electricityConsumePerTime: number;
  overlapBlock: FlatBlockEntity;
  currentPosition: FlatBlockEntity;

  private navigationLogic: NavigationLogic;
  private path: Phaser.Curves.Path;
  private chargeBlock: FlatBlockEntity;
  private garbageGroup: GarbageGroup;
  private moveToWrapper: MoveToWrapper;
  private _movingAnimationTime: number;
  private message: MessageEntity;
  private widthToHuman: number;
  protected human: HumanEntity;
  private evilMode: boolean;
  private movableBlocksGroup: MovableBlocksGroup;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, navigationLogic: NavigationLogic, garbageGroup: GarbageGroup, movableBlocksGroup: MovableBlocksGroup) {
    super(scene, blocksGroup, 'vacuum', DeviceType.Vacuum);

    this.navigationLogic = navigationLogic;
    this.currentPosition = blocksGroup.getChildren()[0] as FlatBlockEntity;
    this.chargeBlock = this.currentPosition;
    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.vacuum;
    this.garbageGroup = garbageGroup;
    this.scene.physics.world.enableBody(this, DYNAMIC_BODY);
    this._movingAnimationTime = 0;
    this.widthToHuman = Number.MAX_VALUE;
    this.evilMode = false;
    this.movableBlocksGroup = movableBlocksGroup;
    this.depth = 998;
  }

  garbageAdded(movableBlocksGroup: MovableBlocksGroup) {
  }

  generateNewPath() {
    let startPosition = this.currentPosition;
    let endPosition = this.currentPosition;
    this.path = new Phaser.Curves.Path(this.x, this.y);

    if (this.garbageGroup.getLength() === 0 && this.currentPosition.objID !== this.chargeBlock.objID) {
      // generate path to the charger
      this.navigationLogic.generatePath(startPosition, this.chargeBlock, this.path);
      endPosition = this.chargeBlock;
    } else if (this.garbageGroup.getLength() > 0) {
      // generate path to the all garbage blocks
      for (const block of this.garbageGroup.getChildren() as GarbageEntity[]) {
        this.navigationLogic.generatePath(startPosition, block.currentBlock, this.path);
        startPosition = block.currentBlock;
        endPosition = block.currentBlock;
      }
    } else if (this.currentPosition.objID === this.chargeBlock.objID) {
      // if there is nothing to do - just turn of
      this.say(VACUUM_CLEAN_DONE, 300, 50, 3000);
      this.path = null;
      this.turnOff();

      return;
    }

    this.moveToWrapper = new MoveToWrapper(this.currentPosition, endPosition, this.path, gameConfig.speed.vacuum);
  }

  turnOn() {
    super.turnOn(this.human);

    this.setTexture('vacuum-on1');

    if (!this.path) {
      this.generateNewPath();
    }
  }

  turnOff() {
    super.turnOff();

    this.setTexture('vacuum');
  }

  update(time: number, secondLeft: boolean) {
    if (this.deviceState !== EDeviceState.Working || this.human.dead) return;

    const point = this.moveToWrapper.getPoint();
    this.x = point.x;
    this.y = point.y;
    this.angle = this.moveToWrapper.angle;

    if (time - this._movingAnimationTime > 200) {
      if (this.texture.key === `vacuum${this.evilMode ? 'Rage' : ''}-on1`) {
        this.setTexture(`vacuum${this.evilMode ? 'Rage' : ''}-on2`);
      } else {
        this.setTexture(`vacuum${this.evilMode ? 'Rage' : ''}-on1`);
      }

      this._movingAnimationTime = time;
    }

    if (this.widthTo(this.moveToWrapper.moveToPosition) < 1) {
      this.currentPosition = this.moveToWrapper.moveToPosition;
      this.generateNewPath();
    }

    if (secondLeft && !this.human.finalSceneInProgress) {
      try {
        this.widthToHuman = this.widthTo(this.human);
        if (this.widthToHuman < gameConfig.evilModVacuumWidth && !this.evilMode) {
          this.turnOnEvilMod();
        } else if (this.widthToHuman < gameConfig.evilModVacuumWidth && this.evilMode) {
          this.path = new Phaser.Curves.Path(this.x, this.y);
          this.currentPosition = this.movableBlocksGroup.getClosest(this.human.x, this.human.y);
          this.navigationLogic.generatePath(this.currentPosition, this.human.overlapBlock, this.path);
          this.moveToWrapper = new MoveToWrapper(this.currentPosition, this.human.overlapBlock, this.path, gameConfig.speed.vacuum);
        } else if (this.widthToHuman > gameConfig.evilModVacuumWidth && this.evilMode) {
          this.turnOffEvilMod();
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (this.message && this.message.active) {
      this.message.updatePosition(this);
    }
  }

  turnOffEvilMod() {
    this.evilMode = false;
    this.generateNewPath();
  }

  turnOnEvilMod() {
    this.evilMode = true;
    this.say(VACUUM_EVIL_MODE_ACTIVATED, 350, 75, 2000);
  }

  say(message: string, width: number, height: number, liveTime: number = 5000) {
    if (this.message) {
      this.message.destroy(true);
    }

    this.message = new MessageEntity(this.scene, this, width, height, liveTime, message);
    this.message.draw();
  }

  setHuman(human: HumanEntity) {
    this.human = human;
  }

  messageDestroyed() {
    this.message = null;
  }
}
