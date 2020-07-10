import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Microwave } from '../furniture/microwave';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';
import { WaitHumanAction } from './wait.human-action';

export class UseMicrowaveGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.TurnOven;
  }

  microwaveBlock: Microwave;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.microwaveBlock = flatMap.getDevices(DeviceType.Microwave)[0] as Microwave;
    this.humanSitBlock = this.microwaveBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new TurnOnHumanAction(this.human, this.microwaveBlock),
      new WaitHumanAction(this.human, this.speed)
    );
  }
}
