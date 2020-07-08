import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class TV extends DeviceInteractiveEntity {

  onPointerdown() {
    alert('TV is on!');
  }
}
