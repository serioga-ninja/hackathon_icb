import { ActionsLogic } from '../actions/actions.logic';
import { GameStats } from '../core/game.stats';
import { NavigationLogic } from '../core/navigation.logic';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { textures } from '../core/game.config';

export class GameScene extends Phaser.Scene {

  private humanEntity: HumanEntity;
  private navigationLogic: NavigationLogic;
  private actionLogic: ActionsLogic;
  private flatMap: FlatMap;
  private gameStats: GameStats;
  private perSecondTime: number;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  /**
   * is called when the scene starts; this function may accept parameters, which are passed from other scenes or game
   * by calling scene.start(key, [params])
   */
  init(params: any): void {
    this.gameStats = new GameStats();
    this.perSecondTime = 0;
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
    this.flatMap = new FlatMap(this);
    this.flatMap.init();

    this.navigationLogic = new NavigationLogic(this.flatMap, this);
    this.flatMap.generateDevices(this.navigationLogic);

    const startBlock = this.flatMap.startBlock;
    this.humanEntity = new HumanEntity(this, startBlock.position.x, startBlock.position.y, 'human', {
      startBlock,
      navigationLogic: this.navigationLogic
    });

    this.actionLogic = new ActionsLogic(this.flatMap, this.humanEntity, this.navigationLogic);//, this.flatMap.generatedBlocks[5][16]);
    for (const room of this.flatMap.rooms) {
      room.overlapHuman(this.humanEntity);
    }

    this.input.on('pointerdown', (pointer: { x: number; y: number; }) => {
      console.log(pointer.x, pointer.y);
    }, this);

    this.physics.add.overlap(this.flatMap.vacuum, this.humanEntity, () => {
      this.humanEntity.makeDead();
    });
  }

  /**
   * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
   */
  update(time: number): void {
    this.actionLogic.update(time);
    this.humanEntity.update(time);
    this.flatMap.update(time);

    //#region Per Second update area
    if (time - this.perSecondTime > 1000) {
      this.perSecondTime = time;

      this.gameStats.addToStat('electricity', this.flatMap.electricDevices.consumePerTick);

      console.log('electricity', this.gameStats.getStat('electricity'));
    }

    //#endregion

    if (this.humanEntity.dead) {
      alert(`Time: ${this.time.now}`);
      this.scene.stop();
      // TODO: open end game scene and show stats etc
    }
  }
}
