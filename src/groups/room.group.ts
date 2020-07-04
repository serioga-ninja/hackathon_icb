import { IElectricityObject } from '../core/interfaces';

export class RoomGroup extends Phaser.GameObjects.Group implements IElectricityObject {

  get consumePerTick() {
    return 0; // TODO
  }

}
