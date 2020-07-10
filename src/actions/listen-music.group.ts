import { GameStats } from '../core/game.stats';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Music } from '../furniture/music';
import { ActionGroupBase, EActionTypes, DeviceType } from './action-group.base';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { UseDeviceHumanAction } from './use-device.human-action';

export class ListenMusicGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.ListenMusic;
  }

  musicBlock: Music;
  navigationLogic: NavigationLogic;
  humanSitBlock: FlatBlockEntity;

  constructor(human: HumanEntity, gameStats: GameStats, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human, gameStats);

    this.musicBlock = flatMap.getDevices(DeviceType.Music)[0] as Music;
    this.humanSitBlock = this.musicBlock.placeToInteract;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new UseDeviceHumanAction(this.human, this.gameStats, this.musicBlock, 5000)
    );
  }
}
