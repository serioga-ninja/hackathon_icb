import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { TV } from '../furniture/tv';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';
import { WaitHumanAction } from './wait.human-action';

export class WatchTVGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.WatchTV;
  }

  tvBlock: TV;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.tvBlock = flatMap.getDevices(DeviceType.TV)[0] as TV;
    this.humanSitBlock = this.tvBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new TurnOnHumanAction(this.human, this.tvBlock),
      new WaitHumanAction(this.human, 10000)
    );
  }
}
