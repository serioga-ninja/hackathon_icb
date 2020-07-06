import gameConfig from './core/game.config';
import { EGroupTypes } from './core/group.base';
import { Point } from './core/point';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';
import { DoorGroup } from './groups/door.group';
import { RoomGroup } from './groups/room.group';
import { RoomsGroups } from './groups/rooms-groups';

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


export enum EHouseGroup {
  Kitchen,
  Bedroom,
  Wardrobe,
  Garage,
  Bathroom
}

export interface ITileEntity {
  cordX: number;
  cordY: number;
  houseParticleType: EHouseParticles;
  particleGroup: EHouseGroup;
}

// [x, y]
const relatedCoordinatesHelper = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

export class FlatMap {

  generatedBlocks: FlatBlockEntity[][];
  movableBlocks: FlatBlockEntity[];
  parsedMap: string[][];
  rooms: RoomsGroups[];
  doors: DoorGroup[];
  scene: Phaser.Scene;

  get startBlock() {
    return this.generatedBlocks[1][1];
  }

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.generatedBlocks = [];
    this.rooms = [];
    this.parsedMap = [];
    this.doors = [];
    this.movableBlocks = [];
  }

  init() {
    this.regenerateMapSymbolToEnum();
    this.generateFlatSpriteBlocks(this.scene);
    this.generateMovableBlocks();
    this.generateDoors();
    this.generateRooms();
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const tileSize = gameConfig.height / this.parsedMap.length;

    // this.sectorChecker();

    this.generatedBlocks = this.parsedMap.map((row, y) => {
      return row.map((blockType, x) => {
        return new FlatBlockEntity(scene, (x * tileSize) + (tileSize / 2), (y * tileSize) + (tileSize / 2), sprayMap[parseInt(blockType)], {
          width: tileSize,
          height: tileSize,
          blockType: parseInt(blockType),
          matrix: { x, y }
        });
      })
    });
  }

  regenerateMapSymbolToEnum() {
    const enumTypeMap = houseStringMap
      .trim()
      .replace(/1/g, EHouseParticles.WallVertical)
      .replace(/2/g, EHouseParticles.WallHorizontal)
      .replace(/=/g, EHouseParticles.Door)
      .replace(/@/g, EHouseParticles.WindowHorizontal)
      .replace(/\$/g, EHouseParticles.WindowVertical)
      .replace(/\./g, EHouseParticles.FreeSpace)
      .match(/.{1,33}/g);

    enumTypeMap.forEach((houseLine: string) => {
      this.parsedMap.push([...<any>houseLine]);
    });
  }

  generateMovableBlocks() {
    if (this.generatedBlocks.length === 0) return;

    for (let y = 0; y < this.generatedBlocks.length; y++) {
      const row = this.generatedBlocks[y];

      for (let x = 0; x < row.length; x++) {
        if (!row[x].isMovable) {
          continue;
        }

        row[x].relatedMovableBlocks = relatedCoordinatesHelper
          .map((pos) => {
            const searchRow = this.generatedBlocks[y + pos[0]];
            if (!searchRow) return;

            const block = searchRow[x + pos[1]];
            if (!block || block && !block.isMovable) return;

            return block;
          })
          .filter((block) => !!block);

        this.movableBlocks.push(row[x]);
      }
    }
  }

  generateDoors() {
    const generateGroupRecursive = (block: FlatBlockEntity, group: DoorGroup = new DoorGroup(this.scene)): DoorGroup => {
      group.add(block);
      block.addGroup(group);

      for (const relatedBlock of block.relatedMovableBlocks) {
        if (relatedBlock.isDoor && !relatedBlock.hasGroup(EGroupTypes.doors)) {
          generateGroupRecursive(relatedBlock, group);
        }
      }

      return group;
    };

    for (const block of this.movableBlocks) {
      if (block.isDoor && !block.hasGroup(EGroupTypes.doors)) {
        this.doors.push(generateGroupRecursive(block));
      }
    }
  }

  generateRooms() {
    const generateGroupRecursive = (block: FlatBlockEntity, group: RoomsGroups = new RoomsGroups(this.scene)): RoomsGroups => {
      group.add(block);
      block.addGroup(group);

      for (const relatedBlock of block.relatedMovableBlocks) {
        if (relatedBlock.isDoor && relatedBlock.hasGroup(EGroupTypes.doors)) {
          const doorGroup = relatedBlock.getGroup(EGroupTypes.doors) as DoorGroup;
          group.addDoors(doorGroup);
          group.add(relatedBlock);
          doorGroup.addRoom(group);
        } else if (relatedBlock.isMovable && !relatedBlock.hasGroup(EGroupTypes.room)) {
          generateGroupRecursive(relatedBlock, group);
        }
      }

      return group;
    }

    for (const block of this.movableBlocks) {
      if (block.isMovable && !block.isDoor && !block.hasGroup(EGroupTypes.room)) {
        this.rooms.push(generateGroupRecursive(block));
      }
    }
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


  sectorChecker(): RoomGroup[] {
    const map = this.parsedMap;

    let fullGroupMap: RoomGroup[] = [];

    for (let cordY = 1; cordY < map.length - 2; cordY++) {
      for (let cordX = 1; cordX < map[cordY].length - 2; cordX++) {
        let standingTile = map[cordY][cordX];

        if (standingTile == EHouseParticles.FreeSpace) {
          //get neibor tiles
          let tilesOnSides: Point[] = [];
          //todo
          if (map[cordY - 1][cordX] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX, cordY - 1));//top

          if (map[cordY + 1][cordX] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX, cordY + 1));//bottom

          if (map[cordY][cordX - 1] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX - 1, cordY));//left

          if (map[cordY][cordX + 1] == EHouseParticles.FreeSpace)
            tilesOnSides.push(new Point(cordX + 1, cordY));//right

          let isGroupWasFound = false;

          for (let j = 0; j < fullGroupMap.length; j++) {
            let tl: Point = tilesOnSides.find(element => fullGroupMap[j].groupMap.find(x => x.x == element.x && x.y == element.y));

            if (tl !== undefined) {
              fullGroupMap[j].groupMap.push(new Point(cordX, cordY));
              isGroupWasFound = true;
              //group has found
              break;
            }
          }

          if (isGroupWasFound == false) {
            let newGroup = new RoomGroup();
            newGroup.groupMap.push(new Point(cordX, cordY));

            fullGroupMap.push(newGroup);

          }
        }

//--------------------------------------------------------------------------------------------------
        if (standingTile == EHouseParticles.Door) {
          //get neibor tiles
          let doorsOnSides: Point[] = [];
          //todo
          if (map[cordY - 1][cordX] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX, cordY - 1));//top

          if (map[cordY + 1][cordX] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX, cordY + 1));//bottom

          if (map[cordY][cordX - 1] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX - 1, cordY));//left

          if (map[cordY][cordX + 1] == EHouseParticles.Door)
            doorsOnSides.push(new Point(cordX + 1, cordY));//right

          let isGroupWasFound = false;

          for (let j = 0; j < fullGroupMap.length; j++) {
            let tl: Point = doorsOnSides.find(element => fullGroupMap[j].groupMap.find(x => x.x == element.x && x.y == element.y));

            if (tl !== undefined) {
              fullGroupMap[j].groupMap.push(new Point(cordX, cordY));
              isGroupWasFound = true;
              //group has found
              break;
            }
          }

          if (isGroupWasFound == false) {
            let newGroup = new RoomGroup();
            newGroup.groupMap.push(new Point(cordX, cordY));

            fullGroupMap.push(newGroup);

          }
        }
//-----------------------------------------------------------------------------

      }

    }


    console.log('fullGroupMap', fullGroupMap);
    return fullGroupMap;
  }
}
