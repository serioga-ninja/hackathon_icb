import 'phaser';
import gameConfig from './core/game.config';
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    title: 'SmartHome',
    width: gameConfig.width,
    height: gameConfig.height,
    parent: 'game',
    scene: [],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: '#a3a3a3'
};

export class SmartHouseGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    const game = new SmartHouseGame(config);
    document.getElementById('game').focus();
};
