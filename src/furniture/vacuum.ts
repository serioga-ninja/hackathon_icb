import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class Vacuum extends DeviceInteractiveEntity {
  onPointerdown() {
    alert('Vacuum is on!');
  }
}
