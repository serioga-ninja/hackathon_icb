import { ActionsLogic } from '../actions/actions.logic';
import { GameStats } from '../core/game.stats';
import { AUCH_THAT_HURTS } from '../core/game.vocabulary';
import { NavigationLogic } from '../core/navigation.logic';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { gameConfig, textures, audio, tileSize } from '../core/game.config';

export class GameScene extends Phaser.Scene {

  private audio: Phaser.Sound.BaseSound;
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

    audio.forEach((sound: any) => {
      this.load.audio(sound.key, sound.path);
    });
  }

  /**
   * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
   * obstacles, enemies, etc.)
   */
  create(): void {
    //this.add.tileSprite(0, 0, tileSize, tileSize, 'grass');

    this.audio = this.sound.add('gameAudio', { volume: 0.4, loop: true });
    this.audio.play();

    this.flatMap = new FlatMap(this);
    this.flatMap.init();

    this.navigationLogic = new NavigationLogic(this.flatMap, this);
    this.flatMap.generateDevices(this.navigationLogic);

    const startBlock = this.flatMap.startBlock;
    this.humanEntity = new HumanEntity(this, startBlock, this.navigationLogic, this.flatMap.garbage);
    this.flatMap.vacuum.setHuman(this.humanEntity);

    this.actionLogic = new ActionsLogic(this.flatMap, this.humanEntity, this.navigationLogic);


    for (const room of this.flatMap.rooms) {
      room.overlapHuman(this.humanEntity, this.gameStats);
    }

    this.input.on('pointerdown', (pointer: { x: number; y: number; }) => {
      console.log(pointer.x, pointer.y);
    }, this);

    this.physics.add.overlap(this.flatMap.vacuum, this.humanEntity, () => {
      this.gameStats.decreaseToStat('humanMood', gameConfig.moodDestroyers.vacuumProblem);
      if (!this.humanEntity.hasMessage) {
        this.humanEntity.say(AUCH_THAT_HURTS, 100, 50, 2000);
      }
    });

    this.flatMap.garbage.overlapVacuum(this.flatMap.vacuum);
    this.flatMap.garbage.overlapHuman(this.humanEntity, this.gameStats);
  }

  /**
   * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
   */
  update(time: number): void {
    const secondLeft = time - this.perSecondTime > 1000;

    this.actionLogic.update(time);
    this.humanEntity.update(time);
    this.flatMap.update(time, secondLeft);

    //#region Per Second update area
    if (secondLeft) {
      this.perSecondTime = time;

      this.gameStats.addToStat('electricity', this.flatMap.electricDevices.consumePerTick);
      this.gameStats.addToStat('water', this.flatMap.waterDevices.consumePerTick);
    }

    //#endregion

    if (this.humanEntity.dead) {
      alert(`Time: ${this.time.now}`);
      this.scene.stop();
      // TODO: open end game scene and show stats etc
    }
  }
}
