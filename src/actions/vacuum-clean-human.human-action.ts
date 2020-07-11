import { gameConfig } from '../core/game.config';
import { MoveToWrapper } from '../core/move-to-wrapper';
import { NavigationLogic } from '../core/navigation.logic';
import { EDeviceState } from '../entity/device-interactive.entity';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { EHumanState, HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { Vacuum } from '../furniture/vacuum';
import { HumanActionBase } from './human-action.base';

export class VacuumCleanHumanHumanAction extends HumanActionBase {

  private block: FlatBlockEntity;
  private vacuum: Vacuum;
  private flatMap: FlatMap;
  private navigationLogic: NavigationLogic;
  private path: Phaser.Curves.Path;
  private moveToWrapper: MoveToWrapper;
  private movingAnimationTime: number;

  constructor(human: HumanEntity, flatMap: FlatMap, navigationLogic: NavigationLogic) {
    super(human);

    this.navigationLogic = navigationLogic;
    this.vacuum = flatMap.vacuum;
    this.flatMap = flatMap;
    this.block = human.currentFlatEntity;
  }

  start() {
    this.path = new Phaser.Curves.Path(this.vacuum.x, this.vacuum.y);
    this.vacuum.currentPosition = this.flatMap.movableBlocksGroup.getClosest(this.vacuum.x, this.vacuum.y);
    this.navigationLogic.generatePath(this.vacuum.currentPosition, this.human.currentFlatEntity, this.path);
    this.moveToWrapper = new MoveToWrapper(this.vacuum.currentPosition, this.human.currentFlatEntity, this.path, gameConfig.speed.vacuum);
    this.vacuum.deviceState = EDeviceState.Working;
    this.inProgress = true;
    this.vacuum.setTexture(`vacuumRage-on2`);
    this.vacuum.depth = 1000;
  }

  update(time: number) {
    if (!this.inProgress) return;

    if (this.moveToWrapper) {
      const vacuum = this.vacuum;

      const point = this.moveToWrapper.getPoint();
      vacuum.x = point.x;
      vacuum.y = point.y;
      vacuum.angle = this.moveToWrapper.angle;

      if (vacuum.widthTo(this.moveToWrapper.moveToPosition) < 1) {
        vacuum.currentPosition = this.moveToWrapper.moveToPosition;
        vacuum.state = EHumanState.waiting;
        this.human.destroy(true);

        this.moveToWrapper = null;
        this._finished = true;
        this.inProgress = false;
      }
    }

    if (time - this.movingAnimationTime > 200) {
      if (this.vacuum.texture.key === `vacuumRage-on1`) {
        this.vacuum.setTexture(`vacuumRage-on2`);
      } else {
        this.vacuum.setTexture(`vacuumRage-on1`);
      }

      this.movingAnimationTime = time;
    }
  }
}
