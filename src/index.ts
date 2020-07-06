import 'phaser';
import gameConfig from './core/game.config';
import { GameScene } from './scenes/game.scene';
import { WelcomeScene } from './scenes/welcome.scene';
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    title: 'SmartHome',
    width: gameConfig.width,
    height: gameConfig.height,
    parent: 'game',
    scene: [new WelcomeScene(), new GameScene()],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
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
