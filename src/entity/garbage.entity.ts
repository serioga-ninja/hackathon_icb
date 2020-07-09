import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';

export class GarbageEntity extends SpriteEntity {

  public blocksGroup: NotMovableBlocksGroup;

  constructor(scene: Phaser.Scene, block: FlatBlockEntity) {
    super(scene, block.x, block.y, 'garbage');

    this.alpha = 1;
  }
}
