import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { GameSceneProperties } from '../properties/game-scene.properties';
import { SpriteEntity } from '../core/sprite.entity';

export class DeviceEntity extends SpriteEntity {

  public blocksGroup: NotMovableBlocksGroup;
  private blocksGroupLength: number;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, key: string) {
    super(scene, blocksGroup.coords.x, blocksGroup.coords.y, key);

    this.blocksGroup = blocksGroup;
    this.blocksGroupLength = this.blocksGroup.getLength();
    console.log(this.blocksGroup, this.blocksGroupLength);

    this.setDisplaySize(GameSceneProperties.tileSize * this.blocksGroupLength, GameSceneProperties.tileSize);
    this.alpha = 1;
    blocksGroup.removeBlocksMovableRelations();
  }
}
