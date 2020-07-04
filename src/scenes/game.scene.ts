import { NavigationLogic } from '../core/navigation.logic';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { RoomGroup } from '../groups/room.group';

export class GameScene extends Phaser.Scene {

  private humanEntity: HumanEntity;
  private flatRoomsGroups: RoomGroup[];
  private navigationLogic: NavigationLogic;
  private flatMap: FlatMap;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  generateRoom() {
    this.flatMap = new FlatMap();
    this.flatMap.generateFlatSpriteBlocks(this);
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
    this.load.image('gray', 'gray.png');
    this.load.image('green', 'green.png');
    this.load.image('red', 'red.png');
  }

  /**
   * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
   * obstacles, enemies, etc.)
   */
  create(): void {
    this.generateRoom();

    this.navigationLogic = new NavigationLogic(this.flatMap.generatedBlocks);
    this.navigationLogic.generatePaths();

    const startBlock = this.flatMap.startBlock;
    this.humanEntity = new HumanEntity(this, startBlock.position.x, startBlock.position.y, 'human', {
      startBlock,
      navigationLogic: this.navigationLogic
    });
  }

  /**
   * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
   */
  update(time: number): void {
  }
}
