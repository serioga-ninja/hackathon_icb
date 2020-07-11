import { ActionsLogic } from '../actions/actions.logic';
import { GameStats } from '../core/game.stats';
import { AUCH_THAT_HURTS } from '../core/game.vocabulary';
import { NavigationLogic } from '../core/navigation.logic';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { gameConfig } from '../core/game.config';

export class GameScene extends Phaser.Scene {

  private audio: Phaser.Sound.BaseSound;
  private humanEntity: HumanEntity;
  private navigationLogic: NavigationLogic;
  private actionLogic: ActionsLogic;
  private flatMap: FlatMap;
  private gameStats: GameStats;
  private perSecondTime: number;
  private gameSceneTime: number;

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
    this.gameStats = GameStats.instance;
    this.gameStats.reset();
    this.perSecondTime = 0;
    this.gameSceneTime = 0;
  }

  /**
   * is called before the scene objects are created, and it contains loading assets; these assets are cached, so when
   * the scene is restarted, they are not reloaded
   */

  preload(): void {
    this.load.spritesheet('suicide', 'textures/person/suicide.png', { frameWidth: 105, frameHeight: 106 });
  }

  /**
   * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
   * obstacles, enemies, etc.)
   */
  create(): void {
    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('suicide', {}),
      frameRate: 9,
      repeat: 0
    });

    if (gameConfig.allowMusic) {
      this.audio = this.sound.add('gameAudio', { volume: 0.1, loop: true });
      this.audio.play();
    }

    this.gameStats.addToStat('score', 0);

    this.flatMap = new FlatMap(this);
    this.flatMap.init();

    this.navigationLogic = new NavigationLogic(this.flatMap, this);
    this.flatMap.generateDevices(this.navigationLogic);

    const startBlock = this.flatMap.startBlock;
    this.humanEntity = new HumanEntity(this, startBlock, this.navigationLogic, this.flatMap.garbage);
    this.flatMap.vacuum.setHuman(this.humanEntity);

    this.actionLogic = new ActionsLogic(this.flatMap, this.humanEntity, this.navigationLogic, this.gameStats);


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

      if (!this.humanEntity.finalSceneInProgress) {
        this.gameStats.addToStat('score', 1);
      }

      this.gameStats.addToStat('electricity', this.flatMap.electricDevices.consumePerTick);
      this.gameStats.addToStat('water', this.flatMap.waterDevices.consumePerTick);
    }
    //#endregion

    // Counting cost of electricity and water
    let electricity = this.gameStats.getStat('electricity'),
      water = this.gameStats.getStat('water'),
      moneyLeft = gameConfig.initialMoney - (electricity * gameConfig.electricityCost) - (water * gameConfig.waterCost);

    this.gameStats.updateStat('money', moneyLeft);

    if ((this.gameStats.getStat('humanMood') <= 0 || this.gameStats.getStat('money') <= 0) && gameConfig.allowToKill && !this.humanEntity.finalSceneInProgress) {
      this.actionLogic.runFinalScene();
    } else if (this.humanEntity.finalSceneInProgress && this.actionLogic.activeGroupFinished) {
      if (gameConfig.allowMusic) {
        this.audio.stop();
      }
      this.scene.stop();
      this.scene.start('ScoreScene');
    }
  }
}
