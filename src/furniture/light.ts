import { EGroupTypes } from '../core/group.base';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';

export class Light extends DeviceInteractiveEntity {

  onPointerdown() {
    const rooms = this.getGroup(EGroupTypes.room);

    rooms.getChildren().forEach((sprite: FlatBlockEntity) => {
      sprite.alpha = sprite.alpha === 1 ? 0.6 : 1;
    })
  }
}
