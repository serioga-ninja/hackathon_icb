import { IElectricityObject } from '../core/interfaces';
import { Point } from '../core/point';

export class RoomGroup {


  groupMap: Point[];
  groupDoors: Doors[];
  groupNumber: number;

  get consumePerTick() {
    var obj: Doors = {
      key1: new Point(0, 0),
      key2: 123
    };

    this.groupDoors.push(obj);
    return 0; // TODO
  }

  constructor() {
    this.groupMap = [];
    this.groupDoors = [];
  }


}

interface Doors {
  [key: string]: Point | number;
}
