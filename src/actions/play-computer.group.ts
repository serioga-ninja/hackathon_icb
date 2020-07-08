import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Computer } from '../furniture/computer';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { WaitHumanAction } from './wait.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';

export class PlayComputerGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.PlayComputer;
  }

  computerBlock: Computer;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.computerBlock = flatMap.getDevices(DeviceType.Computer)[0] as Computer;
    this.humanSitBlock = this.computerBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 180),
      new TurnOnHumanAction(this.human, this.computerBlock),
      new WaitHumanAction(this.human, this.speed)
    );
  }
}
