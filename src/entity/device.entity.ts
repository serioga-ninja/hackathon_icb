import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { GameSceneProperties } from '../properties/game-scene.properties';
import { SpriteEntity } from '../core/sprite.entity';

export class DeviceEntity extends SpriteEntity {

  public blocksGroup: NotMovableBlocksGroup;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, key: string) {
    super(scene, blocksGroup.coords.x, blocksGroup.coords.y, key);

    this.blocksGroup = blocksGroup;
    this.setDisplaySize(GameSceneProperties.tileSize, GameSceneProperties.tileSize);
    this.alpha = 1;
    blocksGroup.removeBlocksMovableRelations();
  }
}
