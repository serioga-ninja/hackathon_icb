import { ActionGroupBase } from './action-group.base';
import { GoToActionGroup } from './go-to.action-group';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { FlatGroup } from '../groups/flat.group';
import { NavigationLogic } from '../core/navigation.logic';
import { WatchTVGroup } from './watch-TV.group';

export class ActionsLogic {
  private flatGroup: FlatGroup;
  private human: HumanEntity;
  private navigationLogic: NavigationLogic;
  private debugBlock: FlatBlockEntity;
  private flatMap: FlatMap;

  private activeActionGroup: ActionGroupBase;

  constructor(flatMap: FlatMap, human: HumanEntity, navigationLogic: NavigationLogic, debugBlock?: FlatBlockEntity) {
    this.flatMap = flatMap;
    this.flatGroup = flatMap.flatGroup;
    this.human = human;
    this.navigationLogic = navigationLogic;
    this.debugBlock = debugBlock;
  }

  generateAction(): ActionGroupBase {
    const oldActionType = !!this.activeActionGroup ? this.activeActionGroup.actionType : -1;
    const min = 0;
    const max = 2;
    const rnd = Math.floor(Math.random() * (max - min)) + min;
    let actionGroup: ActionGroupBase;
    switch (rnd) {
      case 0:
        actionGroup = new GoToActionGroup(this.human, this.flatMap, this.navigationLogic);
        break;
      case 1:
        actionGroup = new WatchTVGroup(this.human, this.flatMap, this.navigationLogic);
        break;
    }

    // prevent repeat action
    if (oldActionType === actionGroup.actionType) {
      return this.generateAction();
    } else {
      return actionGroup;
    }
  }

  update(time: number) {
    if (!this.activeActionGroup || this.activeActionGroup && this.activeActionGroup.finished) {
      this.activeActionGroup = this.generateAction();
      if (this.activeActionGroup) {
        this.activeActionGroup.start();
      }
    } else {
      this.activeActionGroup.update(time);
      if (this.activeActionGroup.finished) {
        this.activeActionGroup.done();
      }
    }
  }
}