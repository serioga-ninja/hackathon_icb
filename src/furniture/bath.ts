import { DeviceEntity } from '../entity/device.entity';

export class Bath extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffBathLogic);
  }

  turnOnOffBathLogic() {
    alert('Bath is on!');
  }
}
