import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';
import STATIC_BODY = Phaser.Physics.Arcade.STATIC_BODY;

export class GarbageEntity extends SpriteEntity {

  public blocksGroup: NotMovableBlocksGroup;
  public currentBlock: FlatBlockEntity;
  public readyToDecreaseMood: boolean;

  constructor(scene: Phaser.Scene, block: FlatBlockEntity) {
    super(scene, block.x, block.y, '');

    this.alpha = 1;
    this.setTexture(this.getGarbage());
    this.currentBlock = block;
    this.scene.physics.world.enableBody(this, STATIC_BODY);
    this.readyToDecreaseMood = false;

    setTimeout(() => {
      this.readyToDecreaseMood = true;
    }, 2000);
  }

  getGarbage(): string {
    const min = 0;
    const max = 9;
    const rnd = Math.floor(min + Math.random() * (max + 1 - min));
    const garbageList: string[] = ['apple', 'banana', 'bottle', 'chips', 'paper'];
  
    return garbageList[rnd];
  }
}
