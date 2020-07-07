import gameConfig from '../core/game.config';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { IPathRow, NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class MoveHumanAction extends HumanActionBase {

  private block: FlatBlockEntity;
  private navigationLogic: NavigationLogic;
  private _fullPath: IPathRow[];
  private _activePathBlock: IPathRow;
  private _moveToFlatEntity: MoveToWrapper;

  constructor(human: HumanEntity, block: FlatBlockEntity, navigationLogic: NavigationLogic) {
    super(human);

    this.navigationLogic = navigationLogic;
    this.block = block;

    if (gameConfig.debug) {
      block.setTint(0xff0000);
    }

    console.group('MoveHumanAction');
    console.log(human.currentFlatEntity, block);
    this._fullPath = navigationLogic.generatePath(human.currentFlatEntity, block);
    this.generatePath();
    console.groupEnd();
  }

  generatePath() {
    try {
      this._activePathBlock = this._fullPath.shift();

      if (!this._activePathBlock) return;

      this._activePathBlock.path = this.navigationLogic.generateRoomPath(
        this._activePathBlock.room,
        this._activePathBlock.startBlock,
        this._activePathBlock.endBlock
      );
      this._moveToFlatEntity = new MoveToWrapper(this.human.currentFlatEntity, this._activePathBlock.path.pop());

      return this._activePathBlock;
    } catch (error) {
      console.log(this._activePathBlock)
      throw error;
    }
  }

  update(time: number) {
    if (this._moveToFlatEntity) {
      const human = this.human;

      const point = this._moveToFlatEntity.getPoint();
      human.x = point.x;
      human.y = point.y;

      if (human.widthTo(this._moveToFlatEntity.moveToPosition) < 1) {
        human.currentFlatEntity = this._moveToFlatEntity.moveToPosition;
        const nextBlock = this._activePathBlock.path.pop()

        // set nex waypoint move to
        if (nextBlock) {
          this._moveToFlatEntity = new MoveToWrapper(human.currentFlatEntity, nextBlock);
        } else if (!this.generatePath()) {
          this._moveToFlatEntity = null;
          this._finished = true;
        }
      }
    }

  }
}
