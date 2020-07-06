import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { MoveHumanAction } from '../human-actions/move.human-action';
import { ActionGroupBase, EActionTypes } from './action-group.base';

export class GoToActionGroup extends ActionGroupBase {
  get actionType() {
    return EActionTypes.GoTo;
  }

  protected block: FlatBlockEntity;
  protected moveHumanAction: MoveHumanAction;
  protected navigationLogic: NavigationLogic;

  constructor(human: HumanEntity, block: FlatBlockEntity, navigationLogic: NavigationLogic) {
    super(human);

    this.block = block;
    this.navigationLogic = navigationLogic;
  }

  start() {
    this.moveHumanAction = new MoveHumanAction(this.human, this.block, this.navigationLogic);
  }

  update(time: number) {
    this.moveHumanAction.update(time);
    if (this.moveHumanAction.finished) {
      this._finished = true;
    }
  }

}
