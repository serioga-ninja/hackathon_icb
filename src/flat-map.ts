import gameConfig from './core/game.config';
import { FlatBlockEntity, EHouseParticles } from './entity/flat-block.entity';


const kitchenRoom: EHouseParticles[][] = [
  [EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Window, EHouseParticles.Window, EHouseParticles.Window, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall,],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Window, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.Door],
  [EHouseParticles.Window, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.Door],
  [EHouseParticles.Window, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.Door],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, EHouseParticles.FreeSpace, , EHouseParticles.Wall],
  [EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Door, EHouseParticles.Door, EHouseParticles.Door, EHouseParticles.Door, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall, EHouseParticles.Wall]
];

export class FlatMap {

  getMap() {
    return kitchenRoom;
  }

  generateFlatSpriteBlocks(scene: Phaser.Scene) {
    const blockWidth = gameConfig.width / kitchenRoom[0].length;
    const blockHeight = gameConfig.height / kitchenRoom.length;

    return kitchenRoom.map((row, x) => {
      return row.map((blockType, y) => {
        return new FlatBlockEntity(scene, x * blockWidth, y * blockHeight, 'white', {
          width: blockWidth,
          height: blockHeight,
          blockType
        });
      })
    });
  }
}
