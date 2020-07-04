import { EHouseParticles, FlatBlockEntity } from '../entity/flat-block.entity';

export interface IPathRelatedBlock {
  block: FlatBlockEntity;
  relatedPathBlocks: FlatBlockEntity[];
}

// [x, y]
const relatedCoordinatesHelper = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];
const pathAvailableBlockTypes: EHouseParticles[] = [
  EHouseParticles.FreeSpace, EHouseParticles.Door
];

export class NavigationLogic {

  static findBlockTo(row: IPathRelatedBlock, usedBlockIds: string[]) {

  }

  private readonly blocks: FlatBlockEntity[][];
  private readonly pathRelatedBlocks: IPathRelatedBlock[];

  constructor(blocks: FlatBlockEntity[][]) {
    this.blocks = blocks;
    this.pathRelatedBlocks = [];
  }

  generatePath(fromBlock: FlatBlockEntity, block: FlatBlockEntity): FlatBlockEntity[] {
    let path: FlatBlockEntity[] = [];

    for (let i = 0; i < 100; i++) {
      const usedBlocksIds: string[] = [fromBlock.objID];


    }

    return path;
  }

  generatePaths() {
    if (this.blocks.length === 0) return;

    for (let y = 0; y < this.blocks.length; y++) {
      const row = this.blocks[y];

      for (let x = 0; x < row.length; x++) {
        if (pathAvailableBlockTypes.indexOf(row[x].blockType) === -1) return;

        this.pathRelatedBlocks.push({
          block: row[x],
          relatedPathBlocks: relatedCoordinatesHelper
            .map((pos) => {
              const searchRow = this.blocks[y + pos[0]];
              if (!searchRow) return;

              const block = searchRow[x + pos[1]];
              if (!block || block && pathAvailableBlockTypes.indexOf(block.blockType) === -1) return;

              return block;
            })
            .filter((block) => !!block)
        });
      }
    }
  }
}
