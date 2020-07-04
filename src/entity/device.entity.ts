import { IElectricityObject } from '../core/interfaces';
import { SpriteEntity } from '../core/sprite.entity';

export class DeviceEntity extends SpriteEntity implements IElectricityObject {

  consumePerTick: number;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.consumePerTick = 0;
  }

}
