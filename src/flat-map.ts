import gameConfig from './core/game.config';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';

const sprayMap = [
  'wallVert', 
  'wallHor',
  'floor', 
  'windowHor',
  'windowVert', 
  'floor'
];

const houseStringMap: any =
  '1223@@@222222@@@2222@@@22222@@222\n' +
  '1.........1..............1......1\n' +
  '1.........1..............1......1\n' +
  '1.........1..............=......1\n' +
  '$.........=..............=......1\n' +
  '$.........=..............1......1\n' +
  '$.........=..............1......1\n' +
  '1.........1..............222==222\n' +
  '1.........1..............1......1\n' +
  '1.........1..............1......1\n' +
  '1222===222222==22222222222......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '$.........=......=.......1......1\n' +
  '$.........=......=.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '$.........1......122222221......1\n' +
  '$.........1......1.......1......1\n' +
  '1.........1......=.......1......1\n' +
  '1.........1......=.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1222@@@222222==22222222222======1'; 


export class FlatMap {

  generatedBlocks: FlatBlockEntity[][];

  get startBlock() {
    return this.generatedBlocks[1][1];
  }

  constructor() {
    this.generatedBlocks = [];
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const tileSize = gameConfig.height / this.regenerateMapSymbolToEnum().length;

    this.generatedBlocks = this.regenerateMapSymbolToEnum().map((row, y) => {
      return row.map((blockType, x) => {
        return new FlatBlockEntity(scene, (x * tileSize) + (tileSize / 2), (y * tileSize) + (tileSize / 2), sprayMap[blockType], {
          width: tileSize,
          height: tileSize,
          blockType
        });
      })
    });
  }

  regenerateMapSymbolToEnum(): EHouseParticles[][] {
    let complitedMap: EHouseParticles[][] = [];

    let enumTypeMap = houseStringMap
      .trim()
      .replace(/1/g, EHouseParticles.WallVertical)
      .replace(/2/g, EHouseParticles.WallHorizontal)
      .replace(/=/g, EHouseParticles.Door)
      .replace(/@/g, EHouseParticles.WindowHorizontal)
      .replace(/\$/g, EHouseParticles.WindowVertical)
      .replace(/\./g, EHouseParticles.FreeSpace)
      .match(/.{1,33}/g);

    enumTypeMap.forEach((houseLine: string) => {
      complitedMap.push([...<any>houseLine]);
    });


    return complitedMap;
  }
}
