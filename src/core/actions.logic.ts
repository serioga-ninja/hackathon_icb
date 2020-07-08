import { ActionGroupBase } from '../actions/action-group.base';
import { GoToActionGroup } from '../actions/go-to.action-group';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { FlatGroup } from '../groups/flat.group';
import { NavigationLogic } from './navigation.logic';

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
    const movableBlocks = this.flatGroup.getChildren().filter((block: FlatBlockEntity) => block.isMovable && !block.isDoor);
    const min = 0;
    const max = movableBlocks.length;
    const rnd = Math.floor(Math.random() * (max - min)) + min;

    return new GoToActionGroup(this.human, this.debugBlock || movableBlocks[rnd] as FlatBlockEntity, this.navigationLogic)
  }

  update(time: number) {
    if (!this.activeActionGroup) {
      this.activeActionGroup = this.generateAction();
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
