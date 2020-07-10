import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Bath } from '../furniture/bath';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { WaitHumanAction } from './wait.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';

export class TakeBathGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.TakeBath;
  }

  bathBlock: Bath;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.bathBlock = flatMap.getDevices(DeviceType.Bath)[0] as Bath;
    this.humanSitBlock = this.bathBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new TurnOnHumanAction(this.human, this.bathBlock),
      new WaitHumanAction(this.human, this.speed)
    );
  }
}
