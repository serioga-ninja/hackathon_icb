import { EGroupTypes } from '../core/group.base';
import { DeviceEntity } from '../entity/device.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';

export class Light extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffLightLogic);
  }

  turnOnOffLightLogic() {
    const rooms = this.getGroup(EGroupTypes.room);

    rooms.getChildren().forEach((sprite: FlatBlockEntity) => {
      sprite.alpha = sprite.alpha === 1 ? 0.6 : 1;
    })
  }
}
