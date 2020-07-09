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
  testTitle: Phaser.GameObjects.Text;
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
    for (const room of this.flatMap.rooms) {
      room.overlapHuman(this.humanEntity);
    }

    this.input.on('pointerdown', (pointer) => {
      console.log(pointer.x, pointer.y);
    }, this);

    this.testTitle = this.add.text(1750, 750, 'Final Scene', { font: '24px Arial Bold', fill: '#adc100' });

    this.testTitle.on('pointerdown', function (/*pointer*/) {
      this.scene.start('FinalScene');
    }, this);
  }

  /**
   * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
   */
  update(time: number): void {
    this.actionLogic.update(time);
    this.humanEntity.update(time);

    if (this.humanEntity.dead) {
      alert(`Time: ${this.time.now}`);
      this.scene.stop();
      // TODO: open end game scene and show stats etc
    }
  }
}
