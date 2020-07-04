import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { RoomGroup } from '../groups/room.group';

export class GameScene extends Phaser.Scene {

  private humanEntity: HumanEntity;
  private flatRoomsGroups: RoomGroup[];
  private allFlatBlocks: FlatBlockEntity[][];

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  generateRoom() {
    this.allFlatBlocks = new FlatMap().generateFlatSpriteBlocks(this);
  }

  /**
   * is called when the scene starts; this function may accept parameters, which are passed from other scenes or game
   * by calling scene.start(key, [params])
   */
  init(params: any): void {
    console.log('init');
  }

  /**
   * is called before the scene objects are created, and it contains loading assets; these assets are cached, so when
   * the scene is restarted, they are not reloaded
   */
  preload(): void {
    this.load.image('white', 'white.png');
  }

  /**
   * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
   * obstacles, enemies, etc.)
   */
  create(): void {
    this.generateRoom();
    this.humanEntity = new HumanEntity(this, 0, 0, 'human', {
      startBlockEntity: this.allFlatBlocks[0][0]
    });
  }

  /**
   * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
   */
  update(time: number): void {
  }
}
