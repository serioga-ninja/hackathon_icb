import { HumanEntity } from './human.entity';

export class HumanMessageEntity extends Phaser.GameObjects.Graphics {
  private _text: Phaser.GameObjects.Text;
  private _width: number;
  private _height: number;
  private lifeTimer: NodeJS.Timeout;

  public message: string;

  constructor(scene: Phaser.Scene, human: HumanEntity, width: number, height: number, lifeTime: number, message: string) {
    super(scene, { x: human.x, y: human.y - human.height });
    this.scene.add.existing(this);


    this.message = message;
    this._width = width;
    this._height = height;
    this.lifeTimer = setTimeout(() => {
      this.destroy(true);
    }, lifeTime);
  }

  draw() {
    const bubblePadding = 10;
    const arrowHeight = this._height / 4;
    //  Bubble shadow
    this.fillStyle(0x222222, 0.5);
    this.fillRoundedRect(6, 6, this._width, this._height, 16);

    //  Bubble color
    this.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    this.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    this.strokeRoundedRect(0, 0, this._width, this._height, 16);
    this.fillRoundedRect(0, 0, this._width, this._height, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(this._width / 7);
    const point1Y = this._height;
    const point2X = Math.floor((this._width / 7) * 2);
    const point2Y = this._height;
    const point3X = Math.floor(this._width / 7);
    const point3Y = Math.floor(this._height + arrowHeight);

    //  Bubble arrow shadow
    this.lineStyle(4, 0x222222, 0.5);
    this.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    this.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    this.lineStyle(2, 0x565656, 1);
    this.lineBetween(point2X, point2Y, point3X, point3Y);
    this.lineBetween(point1X, point1Y, point3X, point3Y);

    this._text = this.scene.add.text(0, 0, this.message, {
      fontFamily: 'Arial',
      fontSize: 20,
      color: '#000000',
      align: 'center',
      wordWrap: { width: this._width - (bubblePadding * 2) }
    });

    const b = this._text.getBounds();

    this._text.setPosition(this.x + (this._width / 2) - (b.width / 2), this.y + (this._height / 2) - (b.height / 2));
  }

  updatePosition(human: HumanEntity) {
    const b = this._text.getBounds();

    this.x = human.x;
    this.y = human.y - human.height;
    this._text.x = this.x + (100 / 2) - (b.width / 2);
    this._text.y = this.y + (50 / 2) - (b.height / 2);
  }

  destroy(fromScene?: boolean) {
    this._text.destroy(true);

    if (this.lifeTimer) {
      clearTimeout(this.lifeTimer);
    }

    super.destroy(fromScene);
  }
}
