import gameConfig from './core/game.config';
import { FlatBlockEntity } from './entity/flat-block.entity';

export enum HouseParticles {
  Wall,
  FreeSpace,
  Window,
  Door,
}

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

const kitchenRoom: HouseParticles[][] = [
  [HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Window, HouseParticles.Window, HouseParticles.Window, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall,],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, , HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, , HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, , HouseParticles.Wall],
  [HouseParticles.Window, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.Door],
  [HouseParticles.Window, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.Door],
  [HouseParticles.Window, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.Door],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, , HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, , HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, , HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Door, HouseParticles.Door, HouseParticles.Door, HouseParticles.Door, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall]
];


export class FlatMap {

  getMap() {
    return this.regenerateMapSymbolToEnum();
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const blockWidth = gameConfig.width / this.regenerateMapSymbolToEnum()[0].length;
    const blockHeight = gameConfig.height / this.regenerateMapSymbolToEnum().length;

    return this.regenerateMapSymbolToEnum().map((row, x) => {
      return row.map((blockPice, y) => {
        return new FlatBlockEntity(scene, x * blockWidth, y * blockHeight, 'white');
      })
    });
  }

  regenerateMapSymbolToEnum(): HouseParticles[][] {
    let complitedMap: HouseParticles[][] = [];

    let enumTypeMap = houseStringMap
      .trim()
      .replace(/#/g, HouseParticles.Wall)
      .replace(/=/g, HouseParticles.Door)
      .replace(/@/g, HouseParticles.Window)
      .replace(/\./g, HouseParticles.FreeSpace)
      .match(/.{1,33}/g);

    enumTypeMap.forEach((houseLine: string) => {
      complitedMap.push([...<any>houseLine]);
    });


    return complitedMap;
  }
}
