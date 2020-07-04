import { EHouseParticles, FlatBlockEntity } from '../entity/flat-block.entity';

export interface IPathRelatedBlock {
  block: FlatBlockEntity;
  relatedPathBlocks: FlatBlockEntity[];
  waveValue: number;
}

// [x, y]
const relatedCoordinatesHelper = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

export class NavigationLogic {

  private readonly blocks: FlatBlockEntity[][];
  private readonly pathRelatedBlocks: FlatBlockEntity[];

  constructor(blocks: FlatBlockEntity[][]) {
    this.blocks = blocks;
    this.pathRelatedBlocks = [];
  }

  private findPath(path: FlatBlockEntity[], humanPosition: FlatBlockEntity): FlatBlockEntity[] {
    console.log('a');
    const currentPathBlock = path[path.length - 1];
    const relatedFinalBlock = currentPathBlock.relatedMovableBlocks.find((b) => b.objID === humanPosition.objID);

    // we find the last humanPosition
    if (relatedFinalBlock) {
      path.push(relatedFinalBlock);

      return path;
    }

    // look in to the all related blocks and find path with them recusevly
    let result = new Array(100000);
    for (const relatedBlock of currentPathBlock.relatedMovableBlocks) {
      if (relatedBlock.waveValue >= currentPathBlock.waveValue && !currentPathBlock.isDoor) continue;

      const _path = this.findPath([...path, relatedBlock], humanPosition);

      if (_path.length < result.length) result = _path;
    }

    // if there was no return then it's dead end
    return result;
  }

  private updateWaveValues(humanPosition: FlatBlockEntity) {
    for (let y = 0; y < this.blocks.length; y++) {
      const row = this.blocks[y];

      for (let x = 0; x < row.length; x++) {
        const block = row[x];
        if (!block.isMovable) continue;

        block.waveValue = Math.max(
          Math.abs(humanPosition.matrix.x - block.matrix.x),
          Math.abs(humanPosition.matrix.y - block.matrix.y),
        );
      }
    }
  }

  private clearWaveValues() {
    for (const block of this.pathRelatedBlocks) {
      block.waveValue = null;
    }
  }

  generatePath(humanPosition: FlatBlockEntity, endPosition: FlatBlockEntity): FlatBlockEntity[] {
    this.clearWaveValues();
    this.updateWaveValues(humanPosition);

    // return [];
    return this.findPath([endPosition], humanPosition)
  }

  generatePaths() {
    if (this.blocks.length === 0) return;

    for (let y = 0; y < this.blocks.length; y++) {
      const row = this.blocks[y];

      for (let x = 0; x < row.length; x++) {
        if (!row[x].isMovable) {
          continue;
        }

        row[x].relatedMovableBlocks = relatedCoordinatesHelper
          .map((pos) => {
            const searchRow = this.blocks[y + pos[0]];
            if (!searchRow) return;

            const block = searchRow[x + pos[1]];
            if (!block || block && !block.isMovable) return;

            return block;
          })
          .filter((block) => !!block);

        this.pathRelatedBlocks.push(row[x]);
      }
    }
  }
}
