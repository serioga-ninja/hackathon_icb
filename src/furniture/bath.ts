import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class Bath extends DeviceInteractiveEntity {

  onPointerdown() {
    alert('Bath is on!');
  }
}
