import { ActionsLogic } from '../actions/actions.logic';
import { GameStats } from '../core/game.stats';
import { AUCH_THAT_HURTS } from '../core/game.vocabulary';
import { NavigationLogic } from '../core/navigation.logic';
import { HumanEntity } from '../entity/human.entity';
import { MuteButtonEntity } from '../entity/mute-button.entity';
import { FlatMap } from '../flat-map';
import { gameConfig, tileSize } from '../core/game.config';
import { NameInputGraphics } from '../graphics/name-input.graphics';

export class GameScene extends Phaser.Scene {

  private audio: Phaser.Sound.BaseSound;
  private endAudio: Phaser.Sound.BaseSound;
  private humanEntity: HumanEntity;
  private navigationLogic: NavigationLogic;
  private actionLogic: ActionsLogic;
  private flatMap: FlatMap;
  private gameStats: GameStats;
  private perSecondTime: number;
  private gameSceneTime: number;
  private modal: NameInputGraphics;

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
    this.load.html('input-name', 'html/input-name.html');
    this.load.spritesheet('suicide', 'textures/person/suicide.png', { frameWidth: 105, frameHeight: 106 });
  }

  /**
   * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
   * obstacles, enemies, etc.)
   */
  create(): void {
    new MuteButtonEntity(this, tileSize * 20.3, tileSize * .5);

    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('suicide', {}),
      frameRate: 9,
      repeat: 0
    });
    this.endAudio = this.sound.add('endAudio', { volume: 0.1, loop: true });
    this.audio = this.sound.add('gameAudio', { volume: 0.1, loop: true });

    this.audio.play();

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
      room.toggleLight();
    }

    this.input.on('pointerdown', (pointer: { x: number; y: number; }) => {
      console.log(pointer.x, pointer.y);
    }, this);

    this.physics.add.overlap(this.flatMap.vacuum, this.humanEntity, () => {
      this.gameStats.decreaseToStat('humanMood', gameConfig.moodDestroyers.vacuumProblem);
      if (!this.humanEntity.hasMessage) {
        this.humanEntity.say(AUCH_THAT_HURTS, 200, 30, 2000);
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
    }
    //#endregion

    if (!this.humanEntity.finalSceneInProgress) {
      // Counting cost of electricity and water
      this.gameStats.decreaseToStat('money', this.flatMap.electricDevices.consumePerTick * gameConfig.electricityCost);
      this.gameStats.decreaseToStat('money', this.flatMap.waterDevices.consumePerTick * gameConfig.waterCost);
    }


    if ((this.gameStats.getStat('humanMood') <= 0 || this.gameStats.getStat('money') <= 0) && gameConfig.allowToKill && !this.humanEntity.finalSceneInProgress) {
      this.actionLogic.runFinalScene(this.audio, this.endAudio);
    } else if (this.humanEntity.finalSceneInProgress && this.actionLogic.activeGroupFinished) {
      this.audio.stop();

      if (!this.modal) {
        this.modal = new NameInputGraphics(this);
        this.modal.show().then(() => {
          this.scene.stop();
          this.scene.start('ScoreScene');
        });
      }
    }
  }
}
