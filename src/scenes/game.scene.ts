import { ActionsLogic } from '../core/actions.logic';
import { NavigationLogic } from '../core/navigation.logic';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';

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
    this.load.image('floor', 'textures/house/floor.jpg');
    this.load.image('wallVert', 'textures/house/wallVert.jpg');
    this.load.image('wallHor', 'textures/house/wallHor.jpg');
    this.load.image('window', 'textures/house/window.jpg');
    this.load.image('door', 'textures/house/door.jpg');
    this.load.image('human', 'textures/person/stand.png');
    this.load.image('human-go-1', 'textures/person/go-1.png');
    this.load.image('human-go-2', 'textures/person/go-2.png');
    this.load.image('light', 'textures/furniture/lamp.png');
    this.load.image('table1', 'textures/furniture/table1.png');
    this.load.image('table2', 'textures/furniture/table2.png');
    this.load.image('bed', 'textures/furniture/bed.png');
    this.load.image('couch', 'textures/furniture/couch.png');
    this.load.image('bath', 'textures/furniture/bath.png');
    this.load.image('fridge', 'textures/furniture/fridge.png');
    this.load.image('teapot', 'textures/furniture/teapot.png');
    this.load.image('tv', 'textures/furniture/tv.png');
    this.load.image('fan', 'textures/furniture/fan.png');
    this.load.image('vacuum', 'textures/furniture/vacuum.png');
    this.load.image('flower', 'textures/furniture/flower.png');
    this.load.image('toilet', 'textures/furniture/toilet.png');
    this.load.image('music', 'textures/furniture/music.png');
    this.load.image('sink', 'textures/furniture/sink.png');
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
