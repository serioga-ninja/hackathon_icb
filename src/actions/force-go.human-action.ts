import { gameConfig } from '../core/game.config';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { EHumanState, HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class ForceGoHumanAction extends HumanActionBase {

  private block: FlatBlockEntity;
  private path: Phaser.Curves.Path;
  private moveToFlatEntity: MoveToWrapper;
  private speed: number;
  private rotate: boolean;
  private state: EHumanState;

  constructor(human: HumanEntity, block: FlatBlockEntity, speed: number = gameConfig.speed.human / 3, rotate: boolean = true, state: EHumanState = EHumanState.moving) {
    super(human);

    this.block = block;
    this.speed = speed;
    this.rotate = rotate;
    this.state = state;
  }

  start() {
    this.path = new Phaser.Curves.Path(this.human.currentFlatEntity.x, this.human.currentFlatEntity.y);
    this.path.lineTo(this.block.x, this.block.y);

    this.moveToFlatEntity = new MoveToWrapper(this.human.currentFlatEntity, this.block, this.path, this.speed);
    this.human.state = this.state;
    this.inProgress = true;
  }

  update(time: number) {
    if (!this.inProgress) return;

    if (this.moveToFlatEntity) {
      const human = this.human;

      const point = this.moveToFlatEntity.getPoint();
      human.x = point.x;
      human.y = point.y;
      if (this.rotate) {
        human.angle = this.moveToFlatEntity.angle;
      }

      if (human.widthTo(this.moveToFlatEntity.moveToPosition) < 1) {
        human.currentFlatEntity = this.moveToFlatEntity.moveToPosition;
        human.state = this.state;

        this.moveToFlatEntity = null;
        this._finished = true;
        this.inProgress = false;
      }
    }
  }
}
