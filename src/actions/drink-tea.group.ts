import { GameStats } from '../core/game.stats';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Teapot } from '../furniture/teapot';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { UseDeviceHumanAction } from './use-device.human-action';

export class DrinkTeaGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.DrinkTea;
  }

  teapotBlock: Teapot;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, gameStats: GameStats, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human, gameStats);

    this.teapotBlock = flatMap.getDevices(DeviceType.Teapot)[0] as Teapot;
    this.humanSitBlock = this.teapotBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 180),
      new UseDeviceHumanAction(this.human, this.gameStats, this.teapotBlock, 5000)
    );
  }
}
