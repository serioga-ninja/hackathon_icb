import gameConfig from './core/game.config';
import { FlatBlockEntity } from './entity/flat-block.entity';

export enum HouseParticles {
  Wall,
  FreeSpace,
  Window,
  Door,
}

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
    return kitchenRoom;
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const blockWidth = gameConfig.width / kitchenRoom[0].length;
    const blockHeight = gameConfig.height / kitchenRoom.length;

    return kitchenRoom.map((row, x) => {
      return row.map((blockPice, y) => {
        return new FlatBlockEntity(scene, x * blockWidth, y * blockHeight, 'white');
      })
    });
  }
}
