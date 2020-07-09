import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';
import STATIC_BODY = Phaser.Physics.Arcade.STATIC_BODY;

export class GarbageEntity extends SpriteEntity {

  public blocksGroup: NotMovableBlocksGroup;
  public currentBlock: FlatBlockEntity;
  public readyToDecreaseMood: boolean;

  constructor(scene: Phaser.Scene, block: FlatBlockEntity) {
    super(scene, block.x, block.y, 'garbage');

    this.alpha = 1;
    this.currentBlock = block;
    this.scene.physics.world.enableBody(this, STATIC_BODY);
    this.readyToDecreaseMood = false;

    setTimeout(() => {
      this.readyToDecreaseMood = true;
    }, 2000);
  }
}
