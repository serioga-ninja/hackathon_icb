import 'phaser';
import { gameConfig, tileSize } from './core/game.config';
import { GameScene } from './scenes/game.scene';
import { WelcomeScene } from './scenes/welcome.scene';
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
  title: 'SmartHouseSurvival',
  width: gameConfig.width,
  height: gameConfig.height,
  parent: 'game',
  scene: [new WelcomeScene(), new GameScene()],
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
  
  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight

    let scale = Math.min(w / gameConfig.width, h / gameConfig.height)
    let newWidth = Math.min(w / scale, gameConfig.maxWidth)
    let newHeight = Math.min(h / scale, gameConfig.maxHeight)

    console.log(newWidth, newHeight, tileSize);
    // resize the game
    game.scale.setGameSize(newWidth, newHeight);
    game.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
  }
  window.addEventListener('resize', () => {
    resize();
  });

  resize();
};
