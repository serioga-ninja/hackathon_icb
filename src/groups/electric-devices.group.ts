import { EGroupTypes, GroupBase } from '../core/group.base';
import { IElectricityObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';

export class ElectricDevicesGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.ElectricDevices;
  }

  get consumePerTick(): number {
    return this.getChildren()
      .filter((device: DeviceInteractiveEntity) => device.deviceState === EDeviceState.Working)
      .reduce((consumePerTick, device: IElectricityObject) => {
        consumePerTick += device.electricityConsumePerTime;

        return consumePerTick;
      }, 0);
  }
}
