import { DeviceType } from '../actions/action-group.base';
import { gameConfig } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { NavigationLogic } from '../core/navigation.logic';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { GarbageEntity } from '../entity/garbage.entity';
import { GarbageGroup } from '../groups/garbage.group';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY;

export class Vacuum extends DeviceInteractiveEntity implements IElectricityObject {

  placeToInteract: null;
  electricityConsumePerTime: number;
  overlapBlock: FlatBlockEntity;

  private navigationLogic: NavigationLogic;
  private path: Phaser.Curves.Path;
  private currentPosition: FlatBlockEntity;
  private chargeBlock: FlatBlockEntity;
  private garbageGroup: GarbageGroup;
  private moveToWrapper: MoveToWrapper;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, navigationLogic: NavigationLogic, garbageGroup: GarbageGroup) {
    super(scene, blocksGroup, 'vacuum', DeviceType.Vacuum);

    this.navigationLogic = navigationLogic;
    this.currentPosition = blocksGroup.getChildren()[0] as FlatBlockEntity;
    this.chargeBlock = this.currentPosition;
    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.vacuum;
    this.garbageGroup = garbageGroup;
    this.scene.physics.world.enableBody(this, DYNAMIC_BODY);
  }

  garbageAdded() {
    if (this.deviceState !== EDeviceState.Working) return;

    this.currentPosition = this.overlapBlock;
    this.generateNewPath();
  }

  generateNewPath() {
    let startPosition = this.currentPosition;
    let endPosition = this.currentPosition;
    this.path = new Phaser.Curves.Path(startPosition.x, startPosition.y);

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
      this.path = null;
      this.turnOff();

      return;
    }

    this.moveToWrapper = new MoveToWrapper(this.currentPosition, endPosition, this.path, gameConfig.speed.vacuum);
  }

  turnOn() {
    super.turnOn();

    if (!this.path) {
      this.generateNewPath();
    }
  }

  update(time: number) {
    if (this.deviceState !== EDeviceState.Working) return;

    const point = this.moveToWrapper.getPoint();
    this.x = point.x;
    this.y = point.y;
    this.angle = this.moveToWrapper.angle;

    if (this.widthTo(this.moveToWrapper.moveToPosition) < 1) {
      this.currentPosition = this.moveToWrapper.moveToPosition;
      this.generateNewPath();
    }
  }

}
