import { SpriteEntity } from '../core/sprite.entity';

export enum HouseParticles{
  Wall,
  FreeSpace,
  Window,
  Door,
}

const kitchenRoom: Array<any> = [
  [HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Window, HouseParticles.Window, HouseParticles.Window, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, ],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace,,HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace,,HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace,,HouseParticles.Wall],
  [HouseParticles.Window, HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace, HouseParticles.Door],
  [HouseParticles.Window, HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace, HouseParticles.Door],
  [HouseParticles.Window, HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace,  HouseParticles.FreeSpace, HouseParticles.Door],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace,,HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace,,HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace, HouseParticles.FreeSpace,,HouseParticles.Wall],
  [HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Door,  HouseParticles.Door,  HouseParticles.Door,  HouseParticles.Door, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall, HouseParticles.Wall]
];

export class FlatBlockEntity extends SpriteEntity {

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);
  }

}
