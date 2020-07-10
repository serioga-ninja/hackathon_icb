import { gameConfig } from '../core/game.config';
import { GameStats } from '../core/game.stats';
import { AUCH_THAT_HURTS, HUMAN_IN_THE_DARK1, HUMAN_IN_THE_DARK2 } from '../core/game.vocabulary';
import { EGroupTypes, GroupBase } from '../core/group.base';
import { randomFromArr } from '../core/utils';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { Vacuum } from '../furniture/vacuum';
import { DoorGroup } from './door.group';

export class RoomGroup extends GroupBase {

  private electricityDevicesPerTick: number;
  private connectedDoors: DoorGroup[];
  private lightsOn: boolean;

  public relatedRooms: RoomGroup[];

  get groupType() {
    return EGroupTypes.Room;
  }

  get movableBlocks(): FlatBlockEntity[] {
    return this.getChildren().filter((block: FlatBlockEntity) => block.isMovable) as FlatBlockEntity[];
  }

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.electricityDevicesPerTick = 0;
    this.connectedDoors = [];
    this.relatedRooms = [];
    this.lightOff();
  }


  overlapHuman(human: HumanEntity, gameStats: GameStats) {
    this.scene.physics.add.overlap(this, human, (block: FlatBlockEntity, human: HumanEntity) => {
      if (block.isMovable && !human.overlapBlock) {
        human.overlapBlock = block;
      } else if (block.isMovable && human.overlapBlock && human.widthTo(block) < human.widthTo(human.overlapBlock)) {
        human.overlapBlock = block;
      }


      if (!this.lightsOn) {
        gameStats.decreaseToStat('humanMood', gameConfig.moodDestroyers.lightsOff);
        if (!human.hasMessage) {
          human.say(randomFromArr([HUMAN_IN_THE_DARK1, HUMAN_IN_THE_DARK2, AUCH_THAT_HURTS]), 300, 75, 2000);
        }
      }
    });
  }

  lightOff() {
    this.lightsOn = false;
    this.getChildren().forEach((sprite: FlatBlockEntity) => {
      sprite.alpha = !this.lightsOn ? 0.5 : 1;
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
