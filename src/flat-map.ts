import { EGroupTypes } from './core/group.base';
import { DeviceType } from './actions/action-group.base';
import { NavigationLogic } from './core/navigation.logic';
import { DeviceEntity } from './entity/device.entity';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';

import { DoorGroup } from './groups/door.group';
import { FlatGroup } from './groups/flat.group';
import { NotMovableBlocksGroup } from './groups/not-movable-blocks.group';
import { RoomGroup } from './groups/room.group';

import { houseMap, tileSize, devices, furnitures } from './core/game.config';

import { Light } from './furniture/light';
import { TV } from './furniture/tv';
import { Fan } from './furniture/fan';
import { Vacuum } from './furniture/vacuum';
import { Bath } from './furniture/bath';
import { Teapot } from './furniture/teapot';
import { Fridge } from './furniture/fridge';
import { Music } from './furniture/music';


const sprayMap = [
  'wallVert',
  'wallHor',
  'wallX',
  'floor',
  'window',
  'door'
];

export interface ITileEntity {
  cordX: number;
  cordY: number;
  houseParticleType: EHouseParticles;
}

// [x, y]
const relatedCoordinatesHelper = [
  [0, -1],
  [-1, 0], [1, 0],
  [0, 1],
];

export class FlatMap {
  generatedBlocks: FlatBlockEntity[][];
  movableBlocks: FlatBlockEntity[];
  parsedMap: string[][];
  flatGroup: FlatGroup;
  rooms: RoomGroup[];
  doors: DoorGroup[];
  scene: Phaser.Scene;
  devices: DeviceEntity[];
  vacuum: Vacuum;

  get startBlock() {
    return this.generatedBlocks[12][12];
  }

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.generatedBlocks = [];
    this.rooms = [];
    this.parsedMap = [];
    this.doors = [];
    this.devices = [];
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
  }

  getDevices(type: DeviceType) {
    return this.devices.filter((device) => {
      return device.blockType === type;
    });
  }

  generateDevices(navigationLogic: NavigationLogic) {
    let flatDevices = devices.map((c: any) => this.compileFurniture(navigationLogic, c, c.type)),
        flatFurnitures = furnitures.map((c: any) => this.compileFurniture(navigationLogic, c));

    this.devices.push(...flatDevices);
    this.devices.push(...flatFurnitures);
  }

  compileFurniture(navigationLogic: NavigationLogic, device: any, role?: DeviceType): DeviceEntity {
    let blockGroup: FlatBlockEntity[] = [],
      furniture;

    device.blocks.forEach((elem: any) => {
      let block = this.generatedBlocks[elem[0]][elem[1]];
      blockGroup.push(block);
    });
    const group = blockGroup[0].getGroup(EGroupTypes.room);

    switch (role) {
      case DeviceType.Light:
        furniture = new Light(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
        break;
      case DeviceType.TV:
        furniture = new TV(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[device.blocks[0][0] + 1][device.blocks[0][1] + 1]);
        break;
      case DeviceType.Fan:
        furniture = new Fan(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
        break;
      case DeviceType.Vacuum:
        furniture = this.vacuum = new Vacuum(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), navigationLogic, this.movableBlocks);
        break;
      case DeviceType.Bath:
      case DeviceType.Sink:
        furniture = new Bath(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
        break;
      case DeviceType.Teapot:
        furniture = new Teapot(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
        break;
      case DeviceType.Fridge:
        furniture = new Fridge(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
        break;
      case DeviceType.Music:
        furniture = new Music(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[device.blocks[0][0] + 1][device.blocks[0][1]]);
        break;
      default:
        furniture = new DeviceEntity(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
    }

    furniture.addGroup(group);

    return furniture;

  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    this.generatedBlocks = this.parsedMap.map((row, y) => {
      return row.map((blockType, x) => {
        const block = new FlatBlockEntity(scene,
          (x * tileSize) + (tileSize / 2),
          (y * tileSize) + (tileSize / 2),
          sprayMap[parseInt(blockType)],
          {
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
    const enumTypeMap = houseMap
      .trim()
      .replace(/1/g, EHouseParticles.WallVertical)
      .replace(/2/g, EHouseParticles.WallHorizontal)
      .replace(/\+/g, EHouseParticles.WallX)
      .replace(/=/g, EHouseParticles.Door)
      .replace(/@/g, EHouseParticles.Window)
      .replace(/\./g, EHouseParticles.FreeSpace)
      .match(/.{1,21}/g);

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

  update(time: number) {
    this.vacuum.update(time);
  }
}
