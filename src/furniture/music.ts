import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class Music extends DeviceInteractiveEntity {
  onPointerdown() {
    alert('Music is on!');
  }
}
