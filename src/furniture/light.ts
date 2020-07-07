import { EGroupTypes } from '../core/group.base';
import { DeviceEntity } from '../entity/device.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';

export class Light extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'light');

    this.on('pointerdown', this.turnOnOffLightLogic);
  }

  turnOnOffLightLogic() {
    const rooms = this.getGroup(EGroupTypes.room);

    rooms.getChildren().forEach((sprite: FlatBlockEntity) => {
      if (sprite.alpha === 1) {
        sprite.alpha = 0.6;
      } else {
        sprite.alpha = 1
      }
    })
  }
}
