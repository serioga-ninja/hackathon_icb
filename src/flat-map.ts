import gameConfig from './core/game.config';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';
import { Point } from "./core/point";
import { RoomGroup } from "./groups/room.group";

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


export enum EHouseGroup{
  Kitchen,
  Bedroom,
  Wardrobe,
  Garage,
  Bathroom
}

export interface ITileEntity{
  cordX: number;
  cordY: number;
  houseParticleType: EHouseParticles;
  particleGroup: EHouseGroup;
}

export class FlatMap{

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

    this.sectorChecker();

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


  // aweqwe() {
  //   {
  //     cordX: ;
  //     cordY: ;
  //     criticalUpXY: ;
  //     criticalUpYX: ;
  //     criticalDownXY: ;
  //     criticalDownYX: ;
  //     section: ;
  //     type: ;
  //   }
  // }


  sectorChecker():RoomGroup[] {
    const map = this.regenerateMapSymbolToEnum();

    let fullGroupMap: RoomGroup[] = [];

    for (let cordY = 1; cordY < map.length - 2; cordY++) {
      for (let cordX = 1; cordX < map[cordY].length - 2; cordX++) {
        let standingTile = map[cordY][cordX];

        if(standingTile == EHouseParticles.FreeSpace) {
          //get neibor tiles
          let tilesOnSides: Point[] = [];
          //todo
          if(map[cordY - 1][cordX] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX, cordY - 1));//top

          if(map[cordY + 1][cordX] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX, cordY + 1));//bottom

          if(map[cordY][cordX - 1] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX - 1, cordY));//left

          if(map[cordY][cordX + 1] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX + 1, cordY));//right

          let isGroupWasFound = false;

          for (let j = 0; j < fullGroupMap.length ; j++) {
            let tl: Point = tilesOnSides.find(element => fullGroupMap[j].groupMap.find(x => x.x == element.x && x.y == element.y));

            if(tl !== undefined) {
              fullGroupMap[j].groupMap.push(new Point(cordX, cordY));
              isGroupWasFound = true;
              //group has found
              break;
            }
          }

          if(isGroupWasFound == false)
          {
            let newGroup = new RoomGroup();
            newGroup.groupMap.push(new Point(cordX, cordY));

            fullGroupMap.push(newGroup);

          }
        }

//--------------------------------------------------------------------------------------------------
        if(standingTile == EHouseParticles.Door) {
          //get neibor tiles
          let doorsOnSides: Point[] = [];
          //todo
          if(map[cordY - 1][cordX] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX, cordY - 1));//top

          if(map[cordY + 1][cordX] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX, cordY + 1));//bottom

          if(map[cordY][cordX - 1] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX - 1, cordY));//left

          if(map[cordY][cordX + 1] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX + 1, cordY));//right

          let isGroupWasFound = false;

          for (let j = 0; j < fullGroupMap.length ; j++) {
            let tl: Point = doorsOnSides.find(element => fullGroupMap[j].groupMap.find(x => x.x == element.x && x.y == element.y));

            if(tl !== undefined) {
              fullGroupMap[j].groupMap.push(new Point(cordX, cordY));
              isGroupWasFound = true;
              //group has found
              break;
            }
          }

          if(isGroupWasFound == false)
          {
            let newGroup = new RoomGroup();
            newGroup.groupMap.push(new Point(cordX, cordY));

            fullGroupMap.push(newGroup);

          }
        }
//-----------------------------------------------------------------------------

      }

    }


    console.log('fullGroupMap', fullGroupMap);
    return  fullGroupMap;
  }
}
