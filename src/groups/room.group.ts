import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { DoorGroup } from './door.group';

export class RoomGroup extends GroupBase {

  private connectedDoors: DoorGroup[];

  get groupType() {
    return EGroupTypes.room;
  }

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.connectedDoors = [];
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
}
