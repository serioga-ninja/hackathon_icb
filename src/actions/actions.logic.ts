import { GameStats } from '../core/game.stats';
import { ActionGroupBase, EActionTypes } from './action-group.base';
import { FinalGroup } from './final.group';
import { GoToActionGroup } from './go-to.action-group';
import { FlatBlockEntity } from '../entity/flat-block.entity';
import { HumanEntity } from '../entity/human.entity';
import { FlatMap } from '../flat-map';
import { FlatGroup } from '../groups/flat.group';
import { NavigationLogic } from '../core/navigation.logic';
import { WatchTVGroup } from './watch-TV.group';
import { ListenMusicGroup } from './listen-music.group';
import { PlayComputerGroup } from './play-computer.group';
import { TakeBathGroup } from './take-bath.group';
import { OpenFridgeGroup } from './open-fridge.group';
import { DrinkTeaGroup } from './drink-tea.group';
import { TurnOvenGroup } from './turn-oven.group';
import { UseMicrowaveGroup } from './use-microwave.group';
import { UseSinkGroup } from './use-sink.group';
import { UseToiletGroup } from './use-toilet.group';
import { WelcomeGroup } from './welcome.group';

export class ActionsLogic {

  get activeGroupFinished() {
    return !this.activeActionGroup || this.activeActionGroup.finished;
  }

  private flatGroup: FlatGroup;
  private human: HumanEntity;
  private navigationLogic: NavigationLogic;
  private debugBlock: FlatBlockEntity;
  private flatMap: FlatMap;
  private gameStats: GameStats;

  private activeActionGroup: ActionGroupBase;

  public finalSceneInProgress: boolean;

  constructor(flatMap: FlatMap, human: HumanEntity, navigationLogic: NavigationLogic, gameStats: GameStats, debugBlock?: FlatBlockEntity) {
    this.gameStats = gameStats;
    this.flatMap = flatMap;
    this.flatGroup = flatMap.flatGroup;
    this.human = human;
    this.navigationLogic = navigationLogic;
    this.debugBlock = debugBlock;
    this.activeActionGroup = new WelcomeGroup(human, gameStats, flatMap, navigationLogic);
    this.finalSceneInProgress = false;
  }

  generateAction(): ActionGroupBase {
    const oldActionType = !!this.activeActionGroup ? this.activeActionGroup.actionType : -1;
    const min = 0;
    const max = 10;
    const rnd = Math.floor(min + Math.random() * (max + 1 - min));

    let actionGroup: ActionGroupBase;
    switch (rnd) {
      case EActionTypes.GoTo:
        actionGroup = new GoToActionGroup(this.human, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.WatchTV:
        actionGroup = new WatchTVGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.ListenMusic:
        actionGroup = new ListenMusicGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.PlayComputer:
        actionGroup = new PlayComputerGroup(this.human, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.TakeBath:
        actionGroup = new TakeBathGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.OpenFridge:
        actionGroup = new OpenFridgeGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.DrinkTea:
        actionGroup = new DrinkTeaGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.TurnOven:
        actionGroup = new TurnOvenGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.UseMicrowave:
        actionGroup = new UseMicrowaveGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.UseSink:
        actionGroup = new UseSinkGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
      case EActionTypes.UseToilet:
        actionGroup = new UseToiletGroup(this.human, this.gameStats, this.flatMap, this.navigationLogic);
        break;
    }

    // prevent repeat action
    if (oldActionType === actionGroup.actionType) {
      return this.generateAction();
    } else {
      return actionGroup;
    }
  }

  update(time: number) {
    if (this.human.dead && (!this.activeActionGroup || this.activeActionGroup.finished)) return;

    if (!this.activeActionGroup || this.activeActionGroup && this.activeActionGroup.finished) {
      this.activeActionGroup = this.generateAction();
      if (this.activeActionGroup) {
        this.activeActionGroup.inProgress = true;
        this.activeActionGroup.start();
      }
    } else if (!this.activeActionGroup.inProgress) {
      this.activeActionGroup.inProgress = true;
      this.activeActionGroup.start();
    } else {
      this.activeActionGroup.update(time);
      if (this.activeActionGroup.finished) {
        this.activeActionGroup.done();
      }
    }
  }

  runFinalScene(gameAudio: Phaser.Sound.BaseSound, endAudio: Phaser.Sound.BaseSound) {
    this.human.finalSceneInProgress = true;
    this.human.currentFlatEntity = this.flatMap.movableBlocksGroup.getClosest(this.human.x, this.human.y);
    this.activeActionGroup = new FinalGroup(this.human, this.flatMap, this.navigationLogic, gameAudio, endAudio);
    this.activeActionGroup.start();
    this.activeActionGroup.inProgress = true;
  }
}
