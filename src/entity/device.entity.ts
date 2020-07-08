import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';
import { tileSize } from '../core/game.config';

export class DeviceEntity extends SpriteEntity {

  public blocksGroup: NotMovableBlocksGroup;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, key: string) {
    super(scene, blocksGroup.coords.x, blocksGroup.coords.y, key);

    this.blocksGroup = blocksGroup;

    this.setSizeOfBlock(this.blocksGroup);
    this.alpha = 1;

    if (this.texture.key !== 'vacuum') {
      blocksGroup.removeBlocksMovableRelations();
    }
  }

  setSizeOfBlock(group: NotMovableBlocksGroup): void {
    let entry: any = [],
      size: any = {
        width: 1,
        height: 1
      };

    group.children.entries.forEach((e: FlatBlockEntity) => {
      entry.push(e.matrix);
    });

    switch (entry.length) {
      case 2:
        size.width = 2;
        break;
      case 3:
        size.width = 3;
        break;
      case 4:
        size.width = 2;
        size.height = 2;
        break;
    }

    this.setDisplaySize(tileSize * size.width, tileSize * size.height);
  }
}
