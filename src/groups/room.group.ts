import { EGroupTypes, GroupBase } from '../core/group.base';
import { IElectricityObject } from '../core/interfaces';
import { EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { DoorGroup } from './door.group';
import Timeout = NodeJS.Timeout;

export class RoomGroup extends GroupBase {

  private electricityDevicesPerTick: number;
  private connectedDoors: DoorGroup[];
  private lightsOn: boolean;
  private timeToDieTimer: Timeout;
  private electricityDevices: IElectricityObject[];

  public relatedRooms: RoomGroup[];

  get groupType() {
    return EGroupTypes.Room;
  }

  get movableBlocks(): FlatBlockEntity[] {
    return this.getChildren().filter((block: FlatBlockEntity) => block.isMovable) as FlatBlockEntity[];
  }

  get electricityPerTick(): number {
    let res = this.electricityDevices
      .filter((device) => device.deviceState === EDeviceState.Working)
      .reduce((consume, device) => {
        consume += device.electricityConsumePerTime;

        return consume;
      }, 0);

    if (this.lightsOn) {
      res += this.getChildren().length * FlatBlockEntity.ElectricityPerTick;
    }

    return res;
  }

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.electricityDevicesPerTick = 0;
    this.electricityDevices = [];
    this.connectedDoors = [];
    this.relatedRooms = [];
    this.lightsOn = false;
  }

  addDevice(device: IElectricityObject) {
    if (typeof device.electricityConsumePerTime === 'number') {
      this.electricityDevices.push(device);
      this.electricityDevicesPerTick += device.electricityConsumePerTime;
    }
  }

  overlapHuman(human: HumanEntity) {
    this.scene.physics.add.overlap(this, human, () => {
      if (!this.lightsOn) {
        this.timeToDieTimer = setTimeout(() => {
          const isOverlapping = this.scene.physics.world.overlap(this, human);
          if (!this.lightsOn && isOverlapping) {
            human.makeDead();
          }
        }, 1000);
      } else if (this.lightsOn && this.timeToDieTimer) {
        clearTimeout(this.timeToDieTimer);
      }
    });
  }

  toggleLight() {
    this.lightsOn = !this.lightsOn;
    this.getChildren().forEach((sprite: FlatBlockEntity) => {
      sprite.alpha = !this.lightsOn ? 0.5 : 1;
    })
  }

  hasDoorId(roomGroupId: string): boolean {
    return !!this.connectedDoors.find((group) => group.groupId === roomGroupId);
  }

  addDoors(group: DoorGroup) {
    if (this.hasDoorId(group.groupId)) return;

    this.connectedDoors.push(group);
  }

  markedBlocks() {
    return this.getChildren().filter((block: FlatBlockEntity) => typeof block.waveValue === 'number');
  }

  addRelatedRoom(rooms: RoomGroup[]) {

    this.relatedRooms.push(
      ...rooms
        .filter((room) => {
          // room already not exists
          return !this.relatedRooms.find((r) => r.groupId === room.groupId);
        })
        .filter((room) => room.groupId !== this.groupId)
    );
  }

  relatedToRoomDoor(room: RoomGroup): DoorGroup {
    return this.connectedDoors
      .find((door) => {
        return !!door.getRooms().find((r) => r.groupId === room.groupId)
      });
  }
}
