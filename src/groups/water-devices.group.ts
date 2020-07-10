import { EGroupTypes, GroupBase } from '../core/group.base';
import { IElectricityObject, IWaterObject } from '../core/interfaces';
import { DeviceInteractiveEntity, EDeviceState } from '../entity/device-interactive.entity';

export class WaterDevicesGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.WaterDevices;
  }

  get consumePerTick(): number {
    return this.getChildren()
      .filter((device: DeviceInteractiveEntity) => device.deviceState === EDeviceState.Working)
      .reduce((consumePerTick, device: IWaterObject) => {
        consumePerTick += device.waterConsumePerTime;

        return consumePerTick;
      }, 0);
  }
}
