import { IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export class Sink extends DeviceInteractiveEntity implements IWaterObject {
  onPointerdown() {
    alert('Sink is on!');
  }
}
