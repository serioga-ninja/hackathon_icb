import { ICanSay } from '../core/interfaces';

const coords = (entity: ICanSay) => {
  return {
    x: entity.x - (entity.width / 3),
    y: entity.y - (entity.height / 1.3)
  };
}

export class MessageEntity extends Phaser.GameObjects.Graphics {
  private _text: Phaser.GameObjects.Text;
  private _width: number;
  private _height: number;
  private lifeTimer: NodeJS.Timeout;
  private entity: ICanSay;

  public message: string;

  constructor(scene: Phaser.Scene, entity: ICanSay, width: number, height: number, lifeTime: number, message: string) {
    super(scene, coords(entity));
    this.scene.add.existing(this);


    this.depth = 5000;
    this.message = message;
    this.entity = entity;
    this._width = width;
    this._height = height;
    this.lifeTimer = setTimeout(() => {
      this.destroy(true);
    }, lifeTime);
  }

  draw() {
    const bubblePadding = 10;
    const arrowHeight = this._height / 5;
    //  Bubble shadow
    this.fillStyle(0x222222, 0.5);
    this.fillRoundedRect(6, 6, this._width, this._height, 10);

    //  Bubble color
    this.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    this.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    this.strokeRoundedRect(0, 0, this._width, this._height, 10);
    this.fillRoundedRect(0, 0, this._width, this._height, 10);

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
      fontSize: 18,
      color: '#000000',
      align: 'center',
      wordWrap: { width: this._width - (bubblePadding * 2) }
    });
    this._text.depth = 5001;

    const b = this._text.getBounds();

    this._text.setPosition(this.x + (this._width / 2) - (b.width / 2), this.y + (this._height / 2) - (b.height / 2));
  }

  updatePosition(entity: ICanSay) {
    const b = this._text.getBounds();

    const c = coords(entity);
    this.x = c.x;
    this.y = c.y;
    this._text.x = this.x + (this._width / 2) - (b.width / 2);
    this._text.y = this.y + (this._height / 2) - (b.height / 2);
  }

  destroy(fromScene?: boolean) {
    this._text.destroy(true);

    if (this.lifeTimer) {
      clearTimeout(this.lifeTimer);
    }

    super.destroy(fromScene);

    this.entity.messageDestroyed();
  }
}
