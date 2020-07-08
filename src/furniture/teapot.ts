import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { DeviceEntity } from '../entity/device.entity';

export class Teapot extends DeviceInteractiveEntity {
  onPointerdown() {
    alert('Teapot is on!');
  }
}
