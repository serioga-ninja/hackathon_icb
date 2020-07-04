import gameConfig from './core/game.config';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';

const sprayMap = [
  'gray', 'white', 'red', 'green'
];

const kitchenRoom: EHouseParticles[][] = [
  [EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Window, EHouseParticles.Window, EHouseParticles.Window, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall,],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Window, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.Door],
  [EHouseParticles.Window, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.Door],
  [EHouseParticles.Window, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.Door],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Door, EHouseParticles.Door, EHouseParticles.Door, EHouseParticles.Door, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall]
];

export class FlatMap {

  generatedBlocks: FlatBlockEntity[][];

  get startBlock() {
    return this.generatedBlocks[1][1];
  }

  constructor() {
    this.generatedBlocks = [];
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const blockWidth = gameConfig.width / kitchenRoom[0].length;
    const blockHeight = gameConfig.height / kitchenRoom.length;

    this.generatedBlocks = kitchenRoom.map((row, y) => {
      return row.map((blockType, x) => {
        return new FlatBlockEntity(scene, x * blockWidth, y * blockHeight, sprayMap[blockType], {
          width: blockWidth,
          height: blockHeight,
          blockType
        });
      })
    });
  }
}
