import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Toilet } from '../furniture/toilet';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { WaitHumanAction } from './wait.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';

export class UseToiletGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.UseToilet;
  }

  toiletBlock: Toilet;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.toiletBlock = flatMap.getDevices(DeviceType.Toilet)[0] as Toilet;
    this.humanSitBlock = this.toiletBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new TurnOnHumanAction(this.human, this.toiletBlock),
      new WaitHumanAction(this.human, this.speed)
    );
  }
}
