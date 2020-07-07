import { DeviceEntity } from '../entity/device.entity';

export class Vacuum extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffVacuumLogic);
  }

  turnOnOffVacuumLogic() {
    alert('Vacuum is on!');
  }
}
