import { EGroupTypes, GroupBase } from '../core/group.base';
import { EHouseParticles, FlatBlockEntity } from '../entity/flat-block.entity';

// [x, y]
const relatedCoordinatesHelper = [
  [0, -1],
  [-1, 0], [1, 0],
  [0, 1],
];

export class WallsGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.Walls;
  }

  private getRelatedBlocks(coords: number[][], generatedBlocks: FlatBlockEntity[][]): FlatBlockEntity[] {
    return coords
      .map((c) => {
        const row = generatedBlocks[c[1]];
        if (!row) return;

        return row[c[0]];
      })
      .filter((block) => !!block)
      .filter((block) => block.isWall || block.isDoor || block.isWindow);
  }

  correctWallSprites(generatedBlocks: FlatBlockEntity[][]) {

    //#region WallG
    const wallG = this.getChildren().filter((block: FlatBlockEntity) => block.blockType === EHouseParticles.WallG) as FlatBlockEntity[];

    for (const block of wallG) {
      const topLeft = this.getRelatedBlocks([[block.matrix.x + 1, block.matrix.y], [block.matrix.x, block.matrix.y + 1]], generatedBlocks);
      if (topLeft.length === 2) {
        block.angle = 180;
      }

      const bottomLeft = this.getRelatedBlocks([[block.matrix.x, block.matrix.y - 1], [block.matrix.x + 1, block.matrix.y]], generatedBlocks);
      if (bottomLeft.length === 2) {
        block.angle = 90;
      }

      const topRight = this.getRelatedBlocks([[block.matrix.x - 1, block.matrix.y], [block.matrix.x, block.matrix.y + 1]], generatedBlocks);
      if (topRight.length === 2) {
        block.angle = 270;
      }
    }

    //#endregion


    //#region Wall
    const wall = this.getChildren()
      .filter((block: FlatBlockEntity) => {

        return block.blockType === EHouseParticles.Wall &&
          this.getRelatedBlocks([[block.matrix.x, block.matrix.y - 1], [block.matrix.x, block.matrix.y + 1]], generatedBlocks).length === 2;
      }) as FlatBlockEntity[];

    for (const block of wall) {
      block.angle = 90;
    }
    //#endregion

    //#region WallT
    const wallT = this.getChildren()
      .filter((block: FlatBlockEntity) => {

        return block.blockType === EHouseParticles.WallT;
      }) as FlatBlockEntity[];

    for (const block of wallT) {
      const topMiddle = this.getRelatedBlocks([
        [block.matrix.x + 1, block.matrix.y], [block.matrix.x - 1, block.matrix.y], [block.matrix.x, block.matrix.y + 1]
      ], generatedBlocks);

      if (topMiddle.length === 3) {
        block.angle = 180;
      }

      const leftMiddle = this.getRelatedBlocks([
        [block.matrix.x + 1, block.matrix.y], [block.matrix.x, block.matrix.y + 1], [block.matrix.x, block.matrix.y - 1]
      ], generatedBlocks);
      if (leftMiddle.length === 3) {
        block.angle = 90;
      }

      const rightMiddle = this.getRelatedBlocks([
        [block.matrix.x - 1, block.matrix.y], [block.matrix.x, block.matrix.y + 1], [block.matrix.x, block.matrix.y - 1]
      ], generatedBlocks);
      if (rightMiddle.length === 3) {
        block.angle = 270;
      }
    }
    //#endregion
  }
}
