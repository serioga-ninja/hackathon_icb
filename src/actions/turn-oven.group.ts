import { gameConfig } from '../core/game.config';
import { GameStats } from '../core/game.stats';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Oven } from '../furniture/oven';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { UseDeviceHumanAction } from './use-device.human-action';

export class TurnOvenGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.TurnOven;
  }

  ovenBlock: Oven;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, gameStats: GameStats, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human, gameStats);

    this.ovenBlock = flatMap.getDevices(DeviceType.Oven)[0] as Oven;
    this.humanSitBlock = this.ovenBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new UseDeviceHumanAction(this.human, this.gameStats, this.ovenBlock, gameConfig.speedOfWaiting)
    );
  }
}
