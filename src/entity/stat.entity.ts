import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { SpriteEntity } from '../core/sprite.entity';
import { FlatBlockEntity } from './flat-block.entity';
import { tileSize } from '../core/game.config';
import { DeviceType } from '../actions/action-group.base';

export enum EStat {
    Score,
    Mood, 
    Money
}

export class StatEntity extends SpriteEntity {
  public blocksGroup: NotMovableBlocksGroup;
  public statType: EStat;

  constructor(scene: Phaser.Scene, blocksGroup: NotMovableBlocksGroup, type: EStat) {
    super(scene, blocksGroup.coords.x, blocksGroup.coords.y, 'stat');

    this.blocksGroup = blocksGroup;
    this.statType = type;

    this.setDisplaySize(tileSize * 7, tileSize * 1);
    this.generateText();

    this.alpha = 1;
  }

  generateStatName(type: EStat): string {
    switch (type) {
        case EStat.Score:
            return 'SCORE: ';
        case EStat.Mood:
            return 'MOOD: ';
        case EStat.Money:
            return 'MONEY: ';
    }
  }

  generateText() {
    let x = this.blocksGroup.coords.x,
        y = this.blocksGroup.coords.y;

    this.scene.add.bitmapText(x - tileSize * 3, y - tileSize * .17, 'font', this.generateStatName(this.statType), 25);
  }
}
