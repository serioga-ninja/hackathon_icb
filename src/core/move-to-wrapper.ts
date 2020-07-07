import { FlatBlockEntity } from '../entity/flat-block.entity';

export class MoveToWrapper {
  private currentPosition: FlatBlockEntity;
  moveToPosition: FlatBlockEntity;

  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  line: Phaser.Geom.Line;
  point: Phaser.Geom.Rectangle;
  position: number;

  constructor(currentPosition: FlatBlockEntity, moveToPosition: FlatBlockEntity) {
    this.moveToPosition = moveToPosition;
    this.currentPosition = currentPosition;

    this.top = currentPosition.y < moveToPosition.y;
    this.bottom = currentPosition.y > moveToPosition.y;
    this.right = currentPosition.x < moveToPosition.x;
    this.left = currentPosition.x > moveToPosition.x;
    this.line = new Phaser.Geom.Line(currentPosition.x, currentPosition.y, moveToPosition.x, moveToPosition.y);
    this.point = new Phaser.Geom.Rectangle(0, 0, 16, 16);
    this.position = 0;
  }

  getPoint(speed: number = 0.1) {
    this.position += speed;
    const point = new Phaser.Geom.Point();

    this.line.getPoint(this.position, point);

    return point;
  }

}
