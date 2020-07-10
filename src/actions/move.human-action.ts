import { gameConfig } from '../core/game.config';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { EHumanState, HumanEntity } from '../entity/human.entity';
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
  }

  start() {
    if (this.inProgress) return;

    this.inProgress = true;
    if (gameConfig.debug) {
      this.block.setTint(0xff0000);
      this.human.currentFlatEntity.setTint(0xff0000);

      console.group('MoveHumanAction');
      console.log(this.human.currentFlatEntity, this.block);
      console.groupEnd();
    }
    this._path = this.navigationLogic.generatePath(this.human.currentFlatEntity, this.block);
    this._moveToFlatEntity = new MoveToWrapper(this.human.currentFlatEntity, this.block, this._path, gameConfig.speed.human);
    this.human.state = EHumanState.moving;

  }

  update(time: number) {
    if (!this.inProgress) return;

    if (this._moveToFlatEntity) {
      const human = this.human;

      const point = this._moveToFlatEntity.getPoint();
      human.x = point.x;
      human.y = point.y;
      human.angle = this._moveToFlatEntity.angle;

      if (human.widthTo(this._moveToFlatEntity.moveToPosition) < 1) {
        human.currentFlatEntity = this._moveToFlatEntity.moveToPosition;
        human.state = EHumanState.waiting;

        this._moveToFlatEntity = null;
        this._finished = true;
        this.inProgress = false;
      }
    }

  }
}
