import { ActionGroupBase } from '../actions/action-group.base';
import { GoToActionGroup } from '../actions/go-to.action-group';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatGroup } from '../groups/flat.group';
import { NavigationLogic } from './navigation.logic';

export class ActionsLogic {
  private actionGroupsQueue: ActionGroupBase[];
  private flatGroup: FlatGroup;
  private human: HumanEntity;
  private navigationLogic: NavigationLogic;
  private debugBlock: FlatBlockEntity;

  private activeActionGroup: ActionGroupBase;

  constructor(flatGroup: FlatGroup, human: HumanEntity, navigationLogic: NavigationLogic, debugBlock?: FlatBlockEntity) {
    this.actionGroupsQueue = [];
    this.flatGroup = flatGroup;
    this.human = human;
    this.navigationLogic = navigationLogic;
    this.debugBlock = debugBlock;
  }

  addAction() {
    const movableBlocks = this.flatGroup.getChildren().filter((block: FlatBlockEntity) => block.isMovable && !block.isDoor);
    const min = 0;
    const max = movableBlocks.length;
    const rnd = Math.floor(Math.random() * (max - min)) + min;

    this.actionGroupsQueue.push(
      new GoToActionGroup(this.human, this.debugBlock || movableBlocks[rnd] as FlatBlockEntity, this.navigationLogic)
    );
  }

  update(time: number) {
    if (this.actionGroupsQueue.length === 0) {
      this.addAction();
    }

    if (!this.activeActionGroup) {
      this.activeActionGroup = this.actionGroupsQueue.shift();
      if (this.activeActionGroup) {
        this.activeActionGroup.start();
      }
    } else {
      this.activeActionGroup.update(time);
      if (this.activeActionGroup.finished) {
        this.activeActionGroup.done();
        this.activeActionGroup = null;
      }
    }
  }
}
