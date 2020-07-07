import gameConfig from './core/game.config';
import { EGroupTypes } from './core/group.base';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';
import { DoorGroup } from './groups/door.group';
import { FlatGroup } from './groups/flat.group';
import { RoomGroup } from './groups/room.group';

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
  '1.........1..............1......1\n' +
  '$.........2..............=......1\n' +
  '$.........=..............1......1\n' +
  '$.........2..............1......1\n' +
  '1.........1..............2222=222\n' +
  '1.........1..............1......1\n' +
  '1.........1..............1......1\n' +
  '12222=22222222=22222222222......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '$.........=......=.......1......1\n' +
  '$.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '$.........1......122222221......1\n' +
  '$.........1......1.......1......1\n' +
  '1.........1......=.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1.........1......1.......1......1\n' +
  '1222@@@222222=222222222222======1';


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
  flatGroup: FlatGroup;
  rooms: RoomGroup[];
  doors: DoorGroup[];
  scene: Phaser.Scene;

  get startBlock() {
    return this.generatedBlocks[24][13];
  }

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.generatedBlocks = [];
    this.rooms = [];
    this.parsedMap = [];
    this.doors = [];
    this.movableBlocks = [];
    this.flatGroup = new FlatGroup(scene);
  }

  init() {
    this.regenerateMapSymbolToEnum();
    this.generateFlatSpriteBlocks(this.scene);
    this.generateMovableBlocks();
    this.generateDoors();
    this.generateRooms();
    this.generateDoorsEntranceBlocks();
    this.setRoomsAlpha();
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const tileSize = gameConfig.height / this.parsedMap.length;

    this.generatedBlocks = this.parsedMap.map((row, y) => {
      return row.map((blockType, x) => {
        const block = new FlatBlockEntity(scene, (x * tileSize) + (tileSize / 2), (y * tileSize) + (tileSize / 2), sprayMap[parseInt(blockType)], {
          width: tileSize,
          height: tileSize,
          blockType: parseInt(blockType),
          matrix: { x, y }
        });

        this.flatGroup.add(block);

        return block;
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
    const generateGroupRecursive = (block: FlatBlockEntity, group: RoomGroup = new RoomGroup(this.scene)): RoomGroup => {
      group.add(block);
      block.addGroup(group);

      for (const relatedBlock of block.relatedMovableBlocks) {
        if (relatedBlock.isDoor && relatedBlock.hasGroup(EGroupTypes.doors)) {
          const doorGroup = relatedBlock.getGroup(EGroupTypes.doors) as DoorGroup;
          group.addDoors(doorGroup);
          group.add(relatedBlock);
          doorGroup.addRoom(group);
          relatedBlock.addGroup(group);
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

  setRoomsAlpha() {
    this.rooms.forEach(roomsGroup => {
      roomsGroup.children.entries.forEach((sprite: FlatBlockEntity) => {
        sprite.alpha = 0.6;
      })
    })
  }

  generateDoorsEntranceBlocks() {
    for (const doorGroup of this.doors) {
      for (const door of doorGroup.getChildren() as FlatBlockEntity[]) {
        door.relatedEntranceBlocks = [[0, -1], [-1, 0], [1, 0], [0, 1]]
          .map((pos) => {
            const searchRow = this.generatedBlocks[door.matrix.y + pos[0]];
            if (!searchRow) return;

            const block = searchRow[door.matrix.x + pos[1]];
            if (!block || block && !block.isMovable) return;

            return block;
          })
          .filter((block) => !!block);
      }
    }
  }
}
