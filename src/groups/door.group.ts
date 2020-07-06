import { EGroupTypes, GroupBase } from '../core/group.base';
import { RoomsGroups } from './rooms-groups';

export class DoorGroup extends GroupBase {

  private connectedRooms: RoomsGroups[];

  get groupType() {
    return EGroupTypes.doors;
  }

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.connectedRooms = [];
  }

  hasRoomId(roomGroupId: string): boolean {
    return !!this.connectedRooms.find((roomGroup) => roomGroup.groupId === roomGroupId);
  }

  addRoom(group: RoomsGroups) {
    if (this.hasRoomId(group.groupId)) return;

    this.connectedRooms.push(group);
  }
}
