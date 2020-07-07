import { FlatBlockEntity } from '../entity/flat-block.entity';

export class MoveToWrapper {
  private currentPosition: FlatBlockEntity;
  moveToPosition: FlatBlockEntity;

  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  line: Phaser.Geom.Line;
  position: number;

  constructor(currentPosition: FlatBlockEntity, moveToPosition: FlatBlockEntity, line?: Phaser.Geom.Line) {
    this.moveToPosition = moveToPosition;
    this.currentPosition = currentPosition;

    this.top = currentPosition.y < moveToPosition.y;
    this.bottom = currentPosition.y > moveToPosition.y;
    this.right = currentPosition.x < moveToPosition.x;
    this.left = currentPosition.x > moveToPosition.x;
    this.line = new Phaser.Geom.Line(currentPosition.x, currentPosition.y, moveToPosition.x, moveToPosition.y);

    this.line = line || new Phaser.Geom.Line(currentPosition.x, currentPosition.y, moveToPosition.x, moveToPosition.y);
    this.position = 0;
  }

  getPoint(speed: number = 0.02) {
    this.position += speed;
    const point = new Phaser.Geom.Point();

    this.line.getPoint(this.position, point);

    return point;
  }

}
