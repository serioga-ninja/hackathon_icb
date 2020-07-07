import { FlatBlockEntity } from '../entity/flat-block.entity';
import Rectangle = Phaser.Geom.Rectangle;

export class MoveToWrapper {
  private currentPosition: FlatBlockEntity;
  moveToPosition: FlatBlockEntity;

  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  path: Phaser.Curves.Path;
  vec: Phaser.Math.Vector2;
  position: number;
  speed: number;

  constructor(currentPosition: FlatBlockEntity, moveToPosition: FlatBlockEntity, path: Phaser.Curves.Path) {
    this.moveToPosition = moveToPosition;
    this.currentPosition = currentPosition;

    // this.top = currentPosition.y < moveToPosition.y;
    // this.bottom = currentPosition.y > moveToPosition.y;
    // this.right = currentPosition.x < moveToPosition.x;
    // this.left = currentPosition.x > moveToPosition.x;
    //
    this.path = path;
    this.position = 0;
    this.vec = new Phaser.Math.Vector2();
    this.speed = (this.path.getBounds() as any).width;
  }

  getPoint(speed: number = 0.005) {
    this.position += speed;

    if (this.position > 1) {
      this.position = 1;
    }

    this.path.getPoint(this.position, this.vec);

    return this.vec;
  }

}
