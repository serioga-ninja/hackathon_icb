import { DeviceType } from '../actions/action-group.base';
import { gameConfig } from '../core/game.config';
import { IElectricityObject } from '../core/interfaces';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { NavigationLogic } from '../core/navigation.logic';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';

export class Vacuum extends DeviceInteractiveEntity implements IElectricityObject {

  placeToInteract: null;
  electricityConsumePerTime: number;

  private navigationLogic: NavigationLogic;
  private path: Phaser.Curves.Path;
  private currentPosition: FlatBlockEntity;
  private movableBlocks: FlatBlockEntity[];
  private moveToWrapper: MoveToWrapper;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, navigationLogic: NavigationLogic, movableBlocks: FlatBlockEntity[]) {
    super(scene, blocksGroup, 'vacuum', DeviceType.Vacuum);

    this.navigationLogic = navigationLogic;
    this.currentPosition = blocksGroup.getChildren()[0] as FlatBlockEntity;
    this.movableBlocks = movableBlocks;
    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.vacuum;
  }

  generateNewPath() {
    const min = 0;
    const max = this.movableBlocks.length;
    const rnd = Math.floor(Math.random() * (max - min)) + min;
    const endPosition = this.movableBlocks[rnd];
    this.path = this.navigationLogic.generatePath(this.currentPosition, endPosition);
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
