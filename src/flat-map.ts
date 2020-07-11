import { EGroupTypes } from './core/group.base';
import { DeviceType } from './actions/action-group.base';
import { NavigationLogic } from './core/navigation.logic';
import { DeviceEntity } from './entity/device.entity';
import { CoverEntity } from './entity/cover.entity';
import { StatEntity, IStats, EStat } from './entity/stat.entity';
import { EHouseParticles, FlatBlockEntity } from './entity/flat-block.entity';
import { GarbageEntity } from './entity/garbage.entity';

import { DoorGroup } from './groups/door.group';
import { ElectricDevicesGroup } from './groups/electric-devices.group';
import { FlatGroup } from './groups/flat.group';
import { GarbageGroup } from './groups/garbage.group';
import { MovableBlocksGroup } from './groups/movable-blocks.group';
import { NotMovableBlocksGroup } from './groups/not-movable-blocks.group';
import { RoomGroup } from './groups/room.group';

import { houseMap, tileSize, devices, furnitures, startHuman, decor, stats, gameConfig } from './core/game.config';

import { Light } from './furniture/light';
import { TV } from './furniture/tv';
import { Fan } from './furniture/fan';
import { Vacuum } from './furniture/vacuum';
import { Bath } from './furniture/bath';
import { Teapot } from './furniture/teapot';
import { Fridge } from './furniture/fridge';
import { Music } from './furniture/music';
import { Microwave } from './furniture/microwave';
import { Oven } from './furniture/oven';
import { Computer } from './furniture/computer';
import { Sink } from './furniture/sink';
import { Toilet } from './furniture/toilet';
import { WallsGroup } from './groups/walls.group';
import { WaterDevicesGroup } from './groups/water-devices.group';
import { GameStats } from './core/game.stats';

const sprayMap = [
  'wallG',
  'wall',
  'wallT',
  'wallX',
  'floor',
  'window',
  'door',
  'grass',
  ''
];

// [x, y]
const relatedCoordinatesHelper = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

class BlockTypeWrapper {

  blockType: EHouseParticles;

  get isWall() {
    return [
      EHouseParticles.Wall,
      EHouseParticles.WallG,
      EHouseParticles.WallT,
      EHouseParticles.WallX
    ].indexOf(this.blockType) !== -1;
  }

  constructor(blockType: string) {
    this.blockType = parseInt(blockType) as EHouseParticles;
  }
}

export class FlatMap {
  generatedBlocks: FlatBlockEntity[][];
  movableBlocks: FlatBlockEntity[];
  movableBlocksGroup: MovableBlocksGroup;
  parsedMap: string[][];
  flatGroup: FlatGroup;
  rooms: RoomGroup[];
  doors: DoorGroup[];
  scene: Phaser.Scene;
  devices: DeviceEntity[];
  vacuum: Vacuum;
  walls: WallsGroup;
  electricDevices: ElectricDevicesGroup;
  waterDevices: WaterDevicesGroup;
  garbage: GarbageGroup;
  stats: IStats;
  gameStats: GameStats;

  get startBlock() {
    return this.generatedBlocks[startHuman.y][startHuman.x];
  }

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.generatedBlocks = [];
    this.rooms = [];
    this.parsedMap = [];
    this.doors = [];
    this.devices = [];
    this.walls = new WallsGroup(scene);
    this.movableBlocks = [];
    this.flatGroup = new FlatGroup(scene);
    this.electricDevices = new ElectricDevicesGroup(scene);
    this.waterDevices = new WaterDevicesGroup(scene);
    this.garbage = new GarbageGroup(scene, [], { createCallback: this.onGarbageAddCallback.bind(this) });
    this.movableBlocksGroup = new MovableBlocksGroup(scene);
    this.gameStats = GameStats.instance;
    this.stats = {}
  }

  init() {
    this.regenerateMapSymbolToEnum();
    this.generateFlatSpriteBlocks(this.scene);
    this.generateStats();
    this.generateMovableBlocks();
    this.generateDoors();
    this.generateRooms();
    this.generateDecoration();
    this.generateDoorsEntranceBlocks();

    this.walls.correctWallSprites(this.generatedBlocks);
  }

  getDevices(type: DeviceType) {
    return this.devices.filter((device) => {
      return device.blockType === type;
    });
  }

  generateDecoration() {
    decor.forEach((device) => {
      let blockGroup: FlatBlockEntity[] = [];

      device.blocks.forEach((elem: any) => {
        let block = this.generatedBlocks[elem[0]][elem[1]];
        blockGroup.push(block);
      });

      const cover = new CoverEntity(this.scene, new MovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
      const group = blockGroup[0].getGroup(EGroupTypes.Room) as RoomGroup;
      if (group) {
        group.addFurniture(cover);
      }
    });
  }

  generateStats() {
    stats.forEach((stat: any) => {
      let blockGroup: FlatBlockEntity[] = [];

      stat.blocks.forEach((elem: any) => {
        let block = this.generatedBlocks[elem[0]][elem[1]];
        blockGroup.push(block);
      });

      new StatEntity(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), stat.type);

      this.updateStatsValue(stat.type, blockGroup[0].x + tileSize * 1.7, blockGroup[0].y - tileSize * .17, true);
    });
  }

  updateStatsValue(type?: EStat, x?: number, y?: number, create?: boolean) {
    let moodStat = this.gameStats.getStat('humanMood').toFixed(2),
      moneyStat = this.gameStats.getStat('money').toFixed(2),
      scoreStat = this.gameStats.getStat('score').toFixed();

    if (create) {
      switch (type) {
        case EStat.Score:
          this.stats.score = this.scene.add.bitmapText(x, y, 'font', scoreStat.toString(), 25);
          break;
        case EStat.Mood:
          this.stats.mood = this.scene.add.bitmapText(x, y, 'font', moodStat.toString(), 25);
          break;
        case EStat.Money:
          this.stats.money = this.scene.add.bitmapText(x, y, 'font', `$${moneyStat.toString()}`, 25);
          break;
      }
    } else {
      this.stats.score.text = scoreStat.toString();
      this.stats.mood.text = this.gameStats.getStat('humanMood') > 0 ? moodStat.toString() : '0';
      this.stats.money.text = this.gameStats.getStat('money') > 0 ? `$${moneyStat.toString()}` : '0';
    }

  }

  generateDevices(navigationLogic: NavigationLogic) {
    let flatDevices = devices.map((c: any) => this.compileFurniture(navigationLogic, c, c.type));
    let flatFurnitures = furnitures.map((c: any) => this.compileFurniture(navigationLogic, c));

    this.devices.push(...flatDevices);
    this.devices.push(...flatFurnitures);


    const movableBlocks = this.movableBlocks.filter((block) => block.isMovable);
    this.movableBlocks.length = 0;
    this.movableBlocks.push(...movableBlocks);
    this.movableBlocksGroup.addMultiple(this.movableBlocks);
  }

  compileFurniture(navigationLogic: NavigationLogic, device: any, role?: DeviceType): DeviceEntity {
    let blockGroup: FlatBlockEntity[] = [],
      furniture: DeviceEntity;

    device.blocks.forEach((elem: any) => {
      let block = this.generatedBlocks[elem[0]][elem[1]];
      blockGroup.push(block);
    });

    const group = blockGroup[0].getGroup(EGroupTypes.Room) as RoomGroup;
    const x = device.blocks[0][0];
    const y = device.blocks[0][1];

    switch (role) {
      case DeviceType.Light:
        furniture = new Light(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup));
        this.electricDevices.add(furniture);
        break;
      case DeviceType.TV:
        furniture = new TV(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x + 1][y + 1]);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Fan:
        furniture = new Fan(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), null);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Vacuum:
        furniture = this.vacuum = new Vacuum(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), navigationLogic, this.garbage, this.movableBlocksGroup);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Bath:
        furniture = new Bath(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x + 1][y + 1]);
        this.waterDevices.add(furniture);
        break;
      case DeviceType.Sink:
        furniture = new Sink(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x + 1][y], device.key);
        this.waterDevices.add(furniture);
        break;
      case DeviceType.Teapot:
        furniture = new Teapot(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x - 1][y]);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Fridge:
        furniture = new Fridge(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x - 1][y]);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Music:
        furniture = new Music(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x + 1][y]);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Microwave:
        furniture = new Microwave(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x + 1][y]);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Oven:
        furniture = new Oven(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x + 1][y]);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Computer:
        furniture = new Computer(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x - 1][y + 1]);
        this.electricDevices.add(furniture);
        break;
      case DeviceType.Toilet:
        furniture = new Toilet(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), this.generatedBlocks[x - 1][y]);
        this.waterDevices.add(furniture);
        break;
      default:
        furniture = new DeviceEntity(this.scene, new NotMovableBlocksGroup(this.scene, blockGroup), device.key, device.type);
    }

    if (group) {
      furniture.addGroup(group);
      group.addFurniture(furniture);
    }

    return furniture;

  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    this.generatedBlocks = this.parsedMap.map((row, y) => {
      return row.map((blockType, x) => {
        const blockTypeWrapper = new BlockTypeWrapper(blockType);

        const block = new FlatBlockEntity(scene,
          (x * tileSize) + (tileSize / 2),
          (y * tileSize) + (tileSize / 2),
          sprayMap[blockTypeWrapper.blockType],
          {
            width: tileSize,
            height: tileSize,
            blockType: blockTypeWrapper.blockType,
            matrix: { x, y }
          });

        this.flatGroup.add(block);

        if (blockTypeWrapper.isWall) {
          this.walls.add(block);
        }

        return block;
      })
    });
  }

  regenerateMapSymbolToEnum() {
    const enumTypeMap = houseMap.trim().match(/.{1,21}/g);

    enumTypeMap.forEach((houseLine: string) => {
      this.parsedMap.push(houseLine.split(''));
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
        if (relatedBlock.isDoor && !relatedBlock.hasGroup(EGroupTypes.Doors)) {
          generateGroupRecursive(relatedBlock, group);
        }
      }

      return group;
    };

    for (const block of this.movableBlocks) {
      if (block.isDoor && !block.hasGroup(EGroupTypes.Doors)) {
        this.doors.push(generateGroupRecursive(block));
      }
    }
  }

  generateRooms() {
    const generateGroupRecursive = (block: FlatBlockEntity, group: RoomGroup = new RoomGroup(this.scene)): RoomGroup => {
      group.add(block);
      block.addGroup(group);

      for (const relatedBlock of block.relatedMovableBlocks) {
        if (relatedBlock.isDoor && relatedBlock.hasGroup(EGroupTypes.Doors)) {
          const doorGroup = relatedBlock.getGroup(EGroupTypes.Doors) as DoorGroup;
          group.addDoors(doorGroup);
          doorGroup.addRoom(group);
          relatedBlock.addGroup(group);
        } else if (relatedBlock.isMovable && !relatedBlock.hasGroup(EGroupTypes.Room)) {
          generateGroupRecursive(relatedBlock, group);
        }
      }

      return group;
    }

    for (const block of this.movableBlocks) {
      if (block.isMovable && !block.isDoor && !block.hasGroup(EGroupTypes.Room)) {
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


  update(time: number, secondLeft: boolean) {
    this.vacuum.update(time, secondLeft);

    this.updateStatsValue();
  }

  onGarbageAddCallback(item: GarbageEntity) {
    this.vacuum.garbageAdded(this.movableBlocksGroup);
  }
}
