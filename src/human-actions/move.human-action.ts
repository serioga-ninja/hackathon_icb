import gameConfig from '../core/game.config';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class MoveHumanAction extends HumanActionBase {

  private block: FlatBlockEntity;
  private _path: FlatBlockEntity[];
  private _moveToFlatEntity: MoveToWrapper;

  constructor(human: HumanEntity, block: FlatBlockEntity, navigationLogic: NavigationLogic) {
    super(human);

    if (gameConfig.debug) {
      block.setTint(0xff0000);
    }

    console.group('MoveHumanAction');
    console.log(human.currentFlatEntity, block);
    this.block = block;
    this._path = navigationLogic.generatePath(human.currentFlatEntity, block);
    this._moveToFlatEntity = new MoveToWrapper(human.currentFlatEntity, this._path.pop());
    console.groupEnd();
  }

  update(time: number) {
    const human = this.human;

    if (this._moveToFlatEntity) {
      if (this._moveToFlatEntity.bottom) {
        human.y -= human.getData('speed');
      }
      if (this._moveToFlatEntity.top) {
        human.y += human.getData('speed');
      }
      if (this._moveToFlatEntity.right) {
        human.x += human.getData('speed');
      }
      if (this._moveToFlatEntity.left) {
        human.x -= human.getData('speed');
      }

      if (human.widthTo(this._moveToFlatEntity.moveToPosition) < 2) {
        const nextBlock = this._path.pop();

        if (nextBlock) {
          human.currentFlatEntity = this._moveToFlatEntity.moveToPosition;
          this._moveToFlatEntity = new MoveToWrapper(human.currentFlatEntity, nextBlock);
        } else {
          this._moveToFlatEntity = null;
          this._finished = true;
        }
      }
    }

  }
}
