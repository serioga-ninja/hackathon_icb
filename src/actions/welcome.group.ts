import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Sink } from '../furniture/sink';
import { ActionGroupBase, DeviceType, EActionTypes } from './action-group.base';
import { ForceGoHumanAction } from './force-go.human-action';
import { MoveHumanAction } from './move.human-action';
import { RotateHumanAction } from './rotate.human-action';
import { SayHumanAction } from './say.human-action';
import { TurnOnHumanAction } from './turn-on.human-action';
import { WaitHumanAction } from './wait.human-action';

export class WelcomeGroup extends ActionGroupBase {

  private readonly block: FlatBlockEntity;
  private readonly humanSitBlock: FlatBlockEntity;
  private readonly sinkBlock: Sink;
  private readonly navigationLogic: NavigationLogic

  get actionType() {
    return EActionTypes.Welcome;
  }

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.block = flatMap.generatedBlocks[human.currentFlatEntity.matrix.y - 1][human.currentFlatEntity.matrix.x];
    this.sinkBlock = flatMap.getDevices(DeviceType.Sink)[1] as Sink;
    this.navigationLogic = navigationLogic;
    this.humanSitBlock = this.sinkBlock.placeToInteract;
  }

  start() {
    this.actions.push(
      new SayHumanAction(this.human, 'What a nice day to be a live!', 5000, false),
      new ForceGoHumanAction(this.human, this.block, 0.5),
      new MoveHumanAction(this.human, this.humanSitBlock, this.navigationLogic),
      new RotateHumanAction(this.human, 0),
      new TurnOnHumanAction(this.human, this.sinkBlock),
      new WaitHumanAction(this.human, this.speed)
    );
  }
}
