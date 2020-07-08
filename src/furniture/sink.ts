import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class Sink extends DeviceInteractiveEntity {
  onPointerdown() {
    alert('Sink is on!');
  }
}