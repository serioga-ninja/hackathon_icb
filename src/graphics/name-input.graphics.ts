import { gameConfig, tileSize } from '../core/game.config';
import { GameStats } from '../core/game.stats';

export class NameInputGraphics extends Phaser.GameObjects.Graphics {

  constructor(scene: Phaser.Scene, options?: Phaser.Types.GameObjects.Graphics.Options) {
    super(scene, options);

    this.scene.add.existing(this);
    this.depth = 2000;
  }

  show() {
    this.clear();

    const canvasWidth = tileSize * 22;

    this.fillStyle(0x000, 0.5);
    this.fillRect(0, 0, canvasWidth, gameConfig.height);

    const modalX = canvasWidth / 2 - 300;
    const modalY = gameConfig.height / 2 - 200;

    const element: Phaser.GameObjects.DOMElement = this.scene.add.dom(modalX, modalY).createFromCache('input-name');
    element.depth = 3000;

    element.addListener('click');

    return new Promise((resolve) => {

      element.on('click', function (event) {

        if (event.target.name === 'submit') {
          const inputUsername = this.getChildByName('name');
          let userName = inputUsername.value;

          //  Have they entered anything?
          if (userName !== '') {
            //  Turn off the click events
            this.removeListener('click');
            element.node.className = 'loading';

            fetch('http://smleaderboardapi.azurewebsites.net/api/score', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                  heroName: userName,
                  heroPoint: GameStats.instance.getStat('score')
                })
              }
            )
              .then(res => res.json())
              .then(data => {
                GameStats.instance.updateLeaderBoard(data);
                resolve();
              })
              .catch((error) => {
                console.error(error);
                resolve();
              });
          }
        }

      });

    });
  }
}
