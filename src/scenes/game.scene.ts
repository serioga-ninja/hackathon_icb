import { ActionsLogic } from '../actions/actions.logic';
import { NavigationLogic } from '../core/navigation.logic';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { textures } from '../core/game.config';

export class GameScene extends Phaser.Scene {

  private humanEntity: HumanEntity;
  private navigationLogic: NavigationLogic;
  private actionLogic: ActionsLogic;
  private flatMap: FlatMap;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  generateRoom() {
    this.flatMap = new FlatMap(this);
    this.flatMap.init();
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
    textures.forEach((texture: any) => {
      this.load.image(texture.key, texture.path);
    });
  }

  /**
   * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
   * obstacles, enemies, etc.)
   */
  create(): void {
    this.generateRoom();

    this.navigationLogic = new NavigationLogic(this.flatMap, this);

    const startBlock = this.flatMap.startBlock;
    this.humanEntity = new HumanEntity(this, startBlock.position.x, startBlock.position.y, 'human', {
      startBlock,
      navigationLogic: this.navigationLogic
    });

    this.actionLogic = new ActionsLogic(this.flatMap, this.humanEntity, this.navigationLogic);//, this.flatMap.generatedBlocks[5][16]);
  }

  /**
   * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
   */
  update(time: number): void {
    this.actionLogic.update(time);
    this.humanEntity.update(time);
  }
}
