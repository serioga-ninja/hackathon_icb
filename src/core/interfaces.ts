import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export interface IElectricityObject extends DeviceInteractiveEntity {
  readonly electricityConsumePerTime: number;
}
