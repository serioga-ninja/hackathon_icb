import { EGroupTypes, GroupBase } from './group.base';

export abstract class SpriteEntity extends Phaser.GameObjects.Sprite {
  protected relatedGroups: GroupBase[];

  body: Phaser.Physics.Arcade.Body;
  objID: string;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.objID = `${x}-${y}`;
    this.scene = scene;
    this.scene.add.existing(this);
    this.relatedGroups = [];
  }

  widthTo(sprite: { x: number; y: number; }): number {
    return Math.sqrt(Math.pow(sprite.x - this.x, 2) + Math.pow(sprite.y - this.y, 2));
  }

  /**
   * A rectangle is represented as a list [x1, y1, x2, y2], where (x1, y1) are the coordinates of its bottom-left corner, and (x2, y2) are the coordinates of its top-right corner.
   * @return [x1, y1, x2, y2]
   */
  getRectCoords(): number[] {
    return [this.x, this.y + this.height, this.x + this.width, this.y];
  }

  hasGroup(groupType: EGroupTypes): boolean {
    return !!this.relatedGroups.find((group) => group.groupType === groupType);
  }

  addGroup(group: GroupBase) {
    this.relatedGroups.push(group);
  }

  getGroups(groupType?: EGroupTypes): GroupBase[] {
    if (!groupType) return this.relatedGroups;

    return this.relatedGroups.filter((group) => group.groupType === groupType);
  }

  getGroup(groupType: EGroupTypes): GroupBase {
    return this.relatedGroups.find((group) => group.groupType === groupType);
  }
}
