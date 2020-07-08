import { FlatBlockEntity } from '../entity/flat-block.entity';

export class MoveToWrapper {
  private currentPosition: FlatBlockEntity;
  moveToPosition: FlatBlockEntity;

  path: Phaser.Curves.Path;
  vec: Phaser.Math.Vector2;
  position: number;
  speed: number;
  angle: number;
  lastPosition: { x: number; y: number; };

  constructor(currentPosition: FlatBlockEntity, moveToPosition: FlatBlockEntity, path: Phaser.Curves.Path) {
    this.moveToPosition = moveToPosition;
    this.currentPosition = currentPosition;

    this.path = path;
    this.position = 0;
    this.vec = new Phaser.Math.Vector2();
    this.speed = 1 / (this.path.getLength() / 3);
    this.lastPosition = { x: currentPosition.x, y: currentPosition.y };
  }

  getPoint() {
    this.position += this.speed;

    if (this.position > 1) {
      this.position = 1;
    }

    this.path.getPoint(this.position, this.vec);

    const line = new Phaser.Geom.Line(this.vec.x, this.vec.y, this.lastPosition.x, this.lastPosition.y);
    this.angle = Phaser.Geom.Line.Angle(line) * 180 / Math.PI - 90;

    this.lastPosition.x = this.vec.x;
    this.lastPosition.y = this.vec.y;

    return this.vec;
  }

}
