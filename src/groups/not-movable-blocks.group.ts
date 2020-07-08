import { EGroupTypes, GroupBase } from '../core/group.base';
import { FlatBlockEntity } from '../entity/flat-block.entity';

export class NotMovableBlocksGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.notMovableBlocks;
  }

  get coords() {
    const minX = Math.min(...this.getChildren().map((block: FlatBlockEntity) => block.x));
    const maxX = Math.max(...this.getChildren().map((block: FlatBlockEntity) => block.x));
    const minY = Math.min(...this.getChildren().map((block: FlatBlockEntity) => block.y));
    const maxY = Math.max(...this.getChildren().map((block: FlatBlockEntity) => block.y));

    return {
      x: (maxX + minX) / 2,
      y: (maxY + minY) / 2,
    }
  }

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

  }

  removeBlocksMovableRelations() {
    for (const block of this.getChildren() as FlatBlockEntity[]) {
      block.makeImovable();
    }

  }

  /**
   * A rectangle is represented as a list [x1, y1, x2, y2], where (x1, y1) are the coordinates of its bottom-left corner, and (x2, y2) are the coordinates of its top-right corner.
   * @return [x1, y1, x2, y2]
   */
  getRectCoords(): number[] {
    const y1 = Math.max(...this.getChildren().map((block: FlatBlockEntity) => block.y));
    const x1 = Math.min(...this.getChildren().map((block: FlatBlockEntity) => block.x));
    const y2 = Math.min(...this.getChildren().map((block: FlatBlockEntity) => block.y));
    const x2 = Math.max(...this.getChildren().map((block: FlatBlockEntity) => block.x));

    return [x1, y1, x2, y2];
  }
}
