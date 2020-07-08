import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { DoorGroup } from './door.group';

export class RoomGroup extends GroupBase {

  private connectedDoors: DoorGroup[];
  public relatedRooms: RoomGroup[];

  get groupType() {
    return EGroupTypes.room;
  }

  get notMovableBlocks(): FlatBlockEntity[] {
    return this.getChildren().filter((block: FlatBlockEntity) => !block.isMovable) as FlatBlockEntity[];
  }

  get movableBlocks(): FlatBlockEntity[] {
    return this.getChildren().filter((block: FlatBlockEntity) => block.isMovable) as FlatBlockEntity[];
  }

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.connectedDoors = [];
    this.relatedRooms = [];
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
