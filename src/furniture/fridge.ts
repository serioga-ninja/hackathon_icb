import { DeviceEntity } from '../entity/device.entity';

export class Fridge extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffFridgeLogic);
  }

  turnOnOffFridgeLogic() {
    alert('Fridge is on!');
  }
}
