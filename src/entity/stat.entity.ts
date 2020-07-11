import { NotMovableBlocksGroup } from '../groups/not-movable-blocks.group';
import { SpriteEntity } from '../core/sprite.entity';
import { tileSize } from '../core/game.config';

export enum EStat {
    Score,
    Mood, 
    Money
}

export interface IStats {
  score?: Phaser.GameObjects.BitmapText,
  mood?: Phaser.GameObjects.BitmapText,
  money?: Phaser.GameObjects.BitmapText
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

  generateText() {
    let x = this.blocksGroup.coords.x,
        y = this.blocksGroup.coords.y;

    this.scene.add.bitmapText(x - tileSize * 3, y - tileSize * .17, 'font', this.generateStatName(this.statType), 25);
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
}
