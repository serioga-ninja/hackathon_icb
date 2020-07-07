import { DeviceEntity } from '../entity/device.entity';

export class Teapot extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffTeapotLogic);
  }

  turnOnOffTeapotLogic() {
    alert('Teapot is on!');
  }
}
