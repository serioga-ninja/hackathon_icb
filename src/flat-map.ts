import gameConfig from './core/game.config';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';

const sprayMap = [
  'gray', 'white', 'red', 'green'
];

const houseStringMap: any =
  '####@@@######@@@####@@@#####@@###\n' +
  '#.........#..............#......#\n' +
  '#.........#..............#......#\n' +
  '#.........#..............=......#\n' +
  '@.........=..............=......#\n' +
  '@.........=..............#......#\n' +
  '@.........=..............#......#\n' +
  '#.........#..............###==###\n' +
  '#.........#..............#......#\n' +
  '#.........#..............#......#\n' +
  '####===######==###########......#\n' +
  '#.........#......#.......#......#\n' +
  '#.........#......#.......#......#\n' +
  '#.........#......#.......#......#\n' +
  '@.........=......=.......#......#\n' +
  '@.........=......=.......#......#\n' +
  '#.........#......#.......#......#\n' +
  '#.........#......#.......#......#\n' +
  '#.........#......#.......#......#\n' +
  '@.........#......#########......#\n' +
  '@.........#......#.......#......#\n' +
  '#.........#......=.......#......#\n' +
  '#.........#......=.......#......#\n' +
  '#.........#......#.......#......#\n' +
  '####@@@######==###########@@@@@@#';


export class FlatMap {

  generatedBlocks: FlatBlockEntity[][];

  get startBlock() {
    return this.generatedBlocks[1][1];
  }

  constructor() {
    this.generatedBlocks = [];
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const blockWidth = gameConfig.width / this.regenerateMapSymbolToEnum()[0].length;
    const blockHeight = gameConfig.height / this.regenerateMapSymbolToEnum().length;

    this.generatedBlocks = this.regenerateMapSymbolToEnum().map((row, y) => {
      return row.map((blockType, x) => {
        return new FlatBlockEntity(scene, x * blockWidth, y * blockHeight, sprayMap[blockType], {
          width: blockWidth,
          height: blockHeight,
          blockType
        });
      })
    });
  }

  regenerateMapSymbolToEnum(): EHouseParticles[][] {
    let complitedMap: EHouseParticles[][] = [];

    let enumTypeMap = houseStringMap
      .trim()
      .replace(/#/g, EHouseParticles.Wall)
      .replace(/=/g, EHouseParticles.Door)
      .replace(/@/g, EHouseParticles.Window)
      .replace(/\./g, EHouseParticles.FreeSpace)
      .match(/.{1,33}/g);

    enumTypeMap.forEach((houseLine: string) => {
      complitedMap.push([...<any>houseLine]);
    });


    return complitedMap;
  }
}
