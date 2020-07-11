import { gameConfig } from '../core/game.config';
import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class StartAudioHumanAction extends HumanActionBase {

  private audio: Phaser.Sound.BaseSound;

  constructor(human: HumanEntity, audio: Phaser.Sound.BaseSound) {
    super(human);
    this.audio = audio;
  }

  start() {
    if (gameConfig.allowMusic) {
      this.audio.play();
    }
    this._finished = true;

  }

  update(time: number) {
  }
}
