import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { DeviceEntity } from '../entity/device.entity';

export class Oven extends DeviceInteractiveEntity {
  onPointerdown() {
    alert('Oven is on!');
  }
}