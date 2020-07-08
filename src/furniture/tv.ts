import { GroupBase } from '../core/group.base';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { RoomGroup } from '../groups/room.group';

export class TV extends DeviceInteractiveEntity implements IElectricityObject {
  placeToInteract: FlatBlockEntity;
  turnOnOverlay: Phaser.Geom.Polygon;
  graphics: Phaser.GameObjects.Graphics;
  electricityConsumePerTime: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, placeToInteract: FlatBlockEntity) {
    super(scene, blocksGroup, 'tv');

    this.electricityConsumePerTime = 0.05;
    this.graphics = scene.add.graphics();
    this.placeToInteract = placeToInteract;
    this.turnOnOverlay = new Phaser.Geom.Polygon([
      1279, 97,
      1409, 97,
      1537, 251,
      1152, 251,
    ]);


    this.setInteractive();
  }

  private makeOnGraphics() {
    this.graphics.fillStyle(0xffffff);
    this.graphics.fillPoints(this.turnOnOverlay.points, true);
    this.graphics.alpha = 0.5;
  }

  onPointerdown() {
    this.toggleWorkingState();

    if (this.deviceState === EDeviceState.Working) {
      this.makeOnGraphics();
    } else {
      this.graphics.clear();
    }
  }

  turnOn() {
    if (this.deviceState === EDeviceState.Working) return;
    this.deviceState = EDeviceState.Working;
    this.makeOnGraphics();
  }


  addGroup(group: RoomGroup) {
    super.addGroup(group);

    group.addDevice(this);
  }
}
