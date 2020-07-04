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

  private readonly blocks: FlatBlockEntity[][];
  private readonly pathRelatedBlocks: IPathRelatedBlock[];

  constructor(blocks: FlatBlockEntity[][]) {
    this.blocks = blocks;
    this.pathRelatedBlocks = [];
  }

  private findPathRelatedBlock(block: FlatBlockEntity): IPathRelatedBlock {
    return this.pathRelatedBlocks.find((row) => row.block.objID === block.objID);
  }

  private findPath(path: FlatBlockEntity[], block: FlatBlockEntity, usedBlockIds: string[]): FlatBlockEntity[] {
    const currentPathBlock = this.findPathRelatedBlock(path[path.length - 1]);
    const relatedFinalBlock = currentPathBlock.relatedPathBlocks.find((b) => b.objID === block.objID);

    // we find the last block
    if (relatedFinalBlock) {
      path.push(relatedFinalBlock);

      return path;
    }

    // look in to the all related blocks and find path with them recusevly
    let result = new Array(100000);
    for (const relatedBlock of currentPathBlock.relatedPathBlocks) {
      if (usedBlockIds.indexOf(relatedBlock.objID) !== -1) continue;

      const _path = this.findPath([...path, relatedBlock], block, [...usedBlockIds, relatedBlock.objID]);
      if (_path.length < result.length) result = _path;
    }

    // if there was no return then it's dead end
    return result;
  }

  generatePath(fromBlock: FlatBlockEntity, block: FlatBlockEntity): FlatBlockEntity[] {
    let path: FlatBlockEntity[] = [];

    for (let i = 0; i < 100; i++) {
      const _path = this.findPath([fromBlock], block, [fromBlock.objID]);
      if (_path.length < path.length || path.length === 0) path = _path;
    }

    return path;
  }

  generatePaths() {
    if (this.blocks.length === 0) return;

    for (let y = 0; y < this.blocks.length; y++) {
      const row = this.blocks[y];

      for (let x = 0; x < row.length; x++) {
        if (pathAvailableBlockTypes.indexOf(row[x].blockType) === -1) continue;

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
