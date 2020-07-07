import { DeviceEntity } from '../entity/device.entity';

export class TV extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffTVLogic);
  }

  turnOnOffTVLogic() {
    alert('TV is on!');
  }
}
