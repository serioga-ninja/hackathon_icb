import { DeviceEntity } from '../entity/device.entity';

export class Fan extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffFanLogic);
  }

  turnOnOffFanLogic() {
    alert('Fan is on!');
  }
}
