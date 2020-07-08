import { NavigationLogic } from '../core/navigation.logic';
import { DeviceInteractiveEntity } from '../entity/device-interactive.entity';
import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';

export class Vacuum extends DeviceInteractiveEntity {

  placeToInteract: null;
  private navigationLogic: NavigationLogic;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, navigationLogic: NavigationLogic) {
    super(scene, blocksGroup, 'vacuum');

    this.navigationLogic = navigationLogic;
  }

}
