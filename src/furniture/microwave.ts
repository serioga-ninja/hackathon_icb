import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { DeviceEntity } from '../entity/device.entity';

export class Microwave extends DeviceInteractiveEntity {
  onPointerdown() {
    alert('Microwave is on!');
  }
}