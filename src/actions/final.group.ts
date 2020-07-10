import { endHuman } from '../core/game.config';
import { WELCOME_MESSAGE } from '../core/game.vocabulary';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Sink } from '../furniture/sink';
import { ActionGroupBase, DeviceType, EActionTypes } from './action-group.base';
import { ForceGoHumanAction } from './force-go.human-action';
import { GoToActionGroup } from './go-to.action-group';
import { KillHumanAction } from './kill.human-action';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { SayHumanAction } from './say.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';
import { WaitHumanAction } from './wait.human-action';

export class FinalGroup extends ActionGroupBase {

  private readonly block: FlatBlockEntity;
  private readonly humanSitBlock: FlatBlockEntity;
  private readonly sinkBlock: Sink;
  private readonly navigationLogic: NavigationLogic;
  private readonly flatMap: FlatMap;

  get actionType() {
    return EActionTypes.Welcome;
  }

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.block = flatMap.generatedBlocks[endHuman.y][endHuman.x];
    this.sinkBlock = flatMap.getDevices(DeviceType.Sink)[1] as Sink;
    this.navigationLogic = navigationLogic;
    this.humanSitBlock = this.sinkBlock.placeToInteract;
    this.flatMap = flatMap;
  }

  start() {
    this.actions.push(
      // new ForceGoHumanAction(this.human, this.flatMap.generatedBlocks[this.human.currentFlatEntity.matrix.y - 1][this.human.currentFlatEntity.matrix.x], 3),

      new WaitHumanAction(this.human, 1000),
      new MoveHumanAction(this.human, this.block, this.navigationLogic),
      new RotateHumanAction(this.human, 180),
      new SayHumanAction(this.human, WELCOME_MESSAGE, 2000),
      new KillHumanAction(this.human),

      // new ForceGoHumanAction(this.human, this.block, 0.5),
      // new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      // new TurnOnHumanAction(this.human, this.sinkBlock),
      // new WaitHumanAction(this.human, this.speed)
    );
  }
}
