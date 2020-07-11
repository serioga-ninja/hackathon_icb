import { gameConfig } from '../core/game.config';
import { GameStats } from '../core/game.stats';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { EHumanState, HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Toilet } from '../furniture/toilet';
import { ActionGroupBase, DeviceType, EActionTypes } from './action-group.base';
import { ForceGoHumanAction } from './force-go.human-action';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { UseToiletHumanAction } from './use-toilet.human-action';
import { WaitHumanAction } from './wait.human-action';

export class UseToiletGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.UseToilet;
  }

  toiletBlock: Toilet;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;
  flatMap: FlatMap;

  constructor(human: HumanEntity, gameStats: GameStats, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human, gameStats);

    this.toiletBlock = flatMap.getDevices(DeviceType.Toilet)[0] as Toilet;
    this.humanSitBlock = this.toiletBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
    this.flatMap = flatMap;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new ForceGoHumanAction(this.human, this.flatMap.flatGroup.getClosest(this.toiletBlock.x, this.toiletBlock.y), 3, false, EHumanState.siting),
      new UseToiletHumanAction(this.human, this.toiletBlock),
      new WaitHumanAction(this.human, gameConfig.speedOfWaiting),
      new ForceGoHumanAction(this.human, this.humanSitBlock, 3, false, EHumanState.siting),
    );
  }
}
