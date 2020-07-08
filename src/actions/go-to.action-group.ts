import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { MoveHumanAction } from './move.human-action';
import { ActionGroupBase, EActionTypes } from './action-group.base';

export class GoToActionGroup extends ActionGroupBase {
  get actionType() {
    return EActionTypes.GoTo;
  }

  protected block: FlatBlockEntity;
  protected navigationLogic: NavigationLogic;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    const movableBlocks = flatMap.flatGroup.getChildren().filter((block: FlatBlockEntity) => block.isMovable && !block.isDoor);
    const min = 0;
    const max = movableBlocks.length;
    const rnd = Math.floor(Math.random() * (max - min)) + min;

    this.block = movableBlocks[rnd] as FlatBlockEntity;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.actions.push(new MoveHumanAction(this.human, this.block, this.navigationLogic));
  }

}
