import { DeviceType } from '../actions/action-group.base';
import { gameConfig } from '../core/game.config';
import { EGroupTypes } from '../core/group.base';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { RoomGroup } from '../groups/room.group';

export class Light extends DeviceInteractiveEntity implements IElectricityObject {

  placeToInteract: FlatBlockEntity;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup) {
    super(scene, blocksGroup, 'light', DeviceType.Light);

    this.electricityConsumePerTime = gameConfig.consumePerTick.electricity.light;
  }

  turnOn() {
    super.turnOn();

    this.toggleRoomLights();
  }

  turnOff() {
    super.turnOff();

    this.toggleRoomLights();
  }

  toggleRoomLights() {
    const rooms = this.getGroup(EGroupTypes.Room) as RoomGroup;
    rooms.toggleLight();
  }
}
