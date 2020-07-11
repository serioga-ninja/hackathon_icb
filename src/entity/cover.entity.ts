import { MovableBlocksGroup } from '../groups/movable-blocks.group';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';
import { tileSize } from '../core/game.config';
import { DeviceType } from '../actions/action-group.base';

export class CoverEntity extends SpriteEntity {

  public blocksGroup: MovableBlocksGroup;
  public blockType: DeviceType;

  constructor(scene: Phaser.Scene, blocksGroup: MovableBlocksGroup, key: string, type: DeviceType) {
    super(scene, blocksGroup.coords.x, blocksGroup.coords.y, key);

    this.blocksGroup = blocksGroup;
    this.blockType = type;

    this.setSizeOfBlock(this.blocksGroup);
    this.alpha = 1;
  }

  setSizeOfBlock(group: MovableBlocksGroup): void {
    let entry: any = [],
      size: any = {
        width: 1,
        height: 1
      };

    group.children.entries.forEach((e: FlatBlockEntity) => {
      entry.push(e.matrix);
    });

    switch (entry.length) {
      case 9:
        size.width = 3;
        size.height = 3;
        break;
      case 15:
        size.width = 5;
        size.height = 3;
        break;
    }

    this.setDisplaySize(tileSize * size.width, tileSize * size.height);
  }
}
