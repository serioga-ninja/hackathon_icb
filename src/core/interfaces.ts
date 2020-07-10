import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';

export interface IElectricityObject extends DeviceInteractiveEntity {
  readonly electricityConsumePerTime: number;
}

export interface IWaterObject extends DeviceInteractiveEntity {
  readonly waterConsumePerTime: number;
}

export interface ICanSay {
  x: number;
  y: number;
  height: number;

  say(message: string, width: number, height: number, liveTime?: number): void;
  messageDestroyed(): void;
}
