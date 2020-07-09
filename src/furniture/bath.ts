import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { RoomGroup } from '../groups/room.group';
import { DeviceType } from '../actions/action-group.base';

export class Bath extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  graphics: Phaser.GameObjects.Graphics;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'bath', DeviceType.Bath);

    this.electricityConsumePerTime = 0.05;
    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;

    this.setInteractive();
  }

  turnOn() {
    if (this.deviceState === EDeviceState.Working) return;
    this.deviceState = EDeviceState.Working;
    this.setTexture('bathOn');
  }

  turnOff() {
    super.turnOff();

    this.setTexture('bath');
  }

  addGroup(group: RoomGroup) {
    super.addGroup(group);

    group.addDevice(this);
  }
}
