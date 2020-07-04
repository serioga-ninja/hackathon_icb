import gameConfig from './core/game.config';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';
import { Point } from "./core/point";
import { RoomGroup } from "./groups/room.group";

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
    const tileSize = gameConfig.height / this.regenerateMapSymbolToEnum().length;

    this.sectorChecker();

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
