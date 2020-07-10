import { FlatBlockEntity } from '../entity/flat-block.entity';
import { tileSize } from './game.config';

export enum EGroupTypes {
  Doors,
  Room,
  Flat,
  NotMovableBlocks,
  Walls,
  ElectricDevices,
  WaterDevices,
  Garbage,
  MovableBlocks,
}

export abstract class GroupBase extends Phaser.GameObjects.Group {

  abstract groupType: EGroupTypes;

  groupId: string;

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.groupId = Math.ceil(Math.random() * 10000).toString() + new Date().getTime();
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

  getClosest(x: number, y: number): FlatBlockEntity {
    let distance = Number.MAX_VALUE;
    let res: FlatBlockEntity;

    for (const block of this.getChildren() as FlatBlockEntity[]) {
      const d = block.widthTo({ x, y });
      if (d < distance) {
        distance = d;
        res = block;
      }

      if (distance < tileSize) {
        return res;
      }
    }

    return res;
  }
}
