import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class Fridge extends DeviceInteractiveEntity {

  onPointerdown() {
    alert('Fridge is on!');
  }
}
