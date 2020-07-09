import 'phaser';
import { gameConfig } from './core/game.config';
import { GameScene } from './scenes/game.scene';
import { WelcomeScene } from './scenes/welcome.scene';
import { FinalScene } from "./scenes/final.scene";
import GameConfig = Phaser.Types.Core.GameConfig;
import { ScoreScene } from "./scenes/score.scene";

const config: GameConfig = {
  title: 'SmartHouseSurvival',
  width: gameConfig.width,
  height: gameConfig.height,
  parent: 'game',
  scene: [new WelcomeScene(), new GameScene(), new FinalScene(), new ScoreScene()],
  physics: {
    default: 'arcade',
    arcade: {
      debug: gameConfig.debug
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: '#000'
};

export class SmartHouseGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  const game = new SmartHouseGame(config),
    gameObj = document.getElementById('game');

  gameObj.focus();

  window.addEventListener('resize', () => {
    game.scene.game.scale.updateScale();
  });
};
