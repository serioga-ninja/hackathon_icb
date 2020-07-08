import gameConfig from '../core/game.config';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class MoveHumanAction extends HumanActionBase {

  private block: FlatBlockEntity;
  private navigationLogic: NavigationLogic;
  private _path: Phaser.Curves.Path;
  private _moveToFlatEntity: MoveToWrapper;

  constructor(human: HumanEntity, block: FlatBlockEntity, navigationLogic: NavigationLogic) {
    super(human);

    this.navigationLogic = navigationLogic;
    this.block = block;

    if (gameConfig.debug) {
      block.setTint(0xff0000);
      human.currentFlatEntity.setTint(0xff0000);
    }

    console.group('MoveHumanAction');
    console.log(human.currentFlatEntity, block);
    this._path = navigationLogic.generatePath(human.currentFlatEntity, block);
    this._moveToFlatEntity = new MoveToWrapper(human.currentFlatEntity, block, this._path);
    console.groupEnd();
  }

  update(time: number) {
    if (this._moveToFlatEntity) {
      const human = this.human;

      const point = this._moveToFlatEntity.getPoint();
      human.x = point.x;
      human.y = point.y;

      if (human.widthTo(this._moveToFlatEntity.moveToPosition) < 1) {
        human.currentFlatEntity = this._moveToFlatEntity.moveToPosition;

        this._moveToFlatEntity = null;
        this._finished = true;
      }
    }

  }
}
