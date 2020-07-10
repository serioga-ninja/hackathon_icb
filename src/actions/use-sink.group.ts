import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Sink } from '../furniture/sink';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';
import { WaitHumanAction } from './wait.human-action';

export class UseSinkGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.UseSink;
  }

  sinkBlock: Sink;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    const min = 0;
    const max = flatMap.getDevices(DeviceType.Sink).length - 1;
    const rnd = Math.floor(min + Math.random() * (max + 1 - min));


    this.sinkBlock = flatMap.getDevices(DeviceType.Sink)[rnd] as Sink;
    this.humanSitBlock = this.sinkBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new TurnOnHumanAction(this.human, this.sinkBlock),
      new WaitHumanAction(this.human, this.speed)
    );
  }
}
