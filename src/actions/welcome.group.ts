import { ActionGroupBase, EActionTypes } from './action-group.base';
import { RotateHumanAction } from './rotate.human-action';
import { SayHumanAction } from './say.human-action';
import { WaitHumanAction } from './wait.human-action';

export class WelcomeGroup extends ActionGroupBase {

  get actionType() {
    return EActionTypes.Welcome;
  }

  start() {
    this.actions.push(
      new RotateHumanAction(this.human, 0),
      new SayHumanAction(this.human, 'What a nice day to be a live!', 5000),
      new WaitHumanAction(this.human, this.speed)
    );
  }
}
