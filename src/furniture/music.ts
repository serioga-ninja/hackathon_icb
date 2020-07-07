import { DeviceEntity } from '../entity/device.entity';

export class Music extends DeviceEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.on('pointerdown', this.turnOnOffMusicLogic);
  }

  turnOnOffMusicLogic() {
    alert('Music is on!');
  }
}
