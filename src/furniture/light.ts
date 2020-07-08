import { EGroupTypes } from '../core/group.base';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { RoomGroup } from '../groups/room.group';

export class Light extends DeviceInteractiveEntity {

  onPointerdown() {
    const rooms = this.getGroup(EGroupTypes.room) as RoomGroup;
    rooms.toggleLight();
  }
}
