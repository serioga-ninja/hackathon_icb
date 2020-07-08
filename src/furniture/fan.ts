import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class Fan extends DeviceInteractiveEntity {
  onPointerdown() {
    alert('Fan is on!');
  }
}
