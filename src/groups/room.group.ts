import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { DoorGroup } from './door.group';
import Timeout = NodeJS.Timeout;

export class RoomGroup extends GroupBase {

  private electricityDevicesPerTick: number;
  private connectedDoors: DoorGroup[];
  private lightsOn: boolean;
  private timeToDieTimer: Timeout;

  public relatedRooms: RoomGroup[];

  get groupType() {
    return EGroupTypes.Room;
  }

  get movableBlocks(): FlatBlockEntity[] {
    return this.getChildren().filter((block: FlatBlockEntity) => block.isMovable) as FlatBlockEntity[];
  }

  get electricityPerTick(): number {
    return !this.lightsOn ? 0 : this.getChildren().length * FlatBlockEntity.ElectricityPerTick;
  }

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.electricityDevicesPerTick = 0;
    this.connectedDoors = [];
    this.relatedRooms = [];
    this.lightsOn = false;
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
      sprite.alpha = !this.lightsOn ? 0.6 : 1;
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
