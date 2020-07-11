import { HumanEntity } from '../entity/human.entity';
import { HumanActionBase } from './human-action.base';

export class StopAudioHumanAction extends HumanActionBase {

  private audio: Phaser.Sound.BaseSound;

  constructor(human: HumanEntity, audio: Phaser.Sound.BaseSound) {
    super(human);
    this.audio = audio;
  }

  start() {
    this.audio.stop();
    this._finished = true;

  }

  update(time: number) {
  }
}
