import { EGroupTypes, GroupBase } from './group.base';

export abstract class SpriteEntity extends Phaser.GameObjects.Sprite {
  protected relatedGroups: GroupBase[];

  body: Phaser.Physics.Arcade.Body;
  objID: string;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.objID = `${x}-${y}`;
    this.scene = scene;
    this.scene.add.existing(this)
    this.alpha = 0.6;
    this.relatedGroups = [];
  }

  widthTo(sprite: SpriteEntity): number {
    return Math.sqrt(Math.pow(sprite.x - this.x, 2) + Math.pow(sprite.y - this.y, 2));
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
