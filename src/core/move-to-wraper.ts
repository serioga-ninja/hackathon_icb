import { FlatBlockEntity } from '../entity/flat-block.entity';

export class MoveToWraper {
  private currentPosition: FlatBlockEntity;
  moveToPosition: FlatBlockEntity;

  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;

  constructor(currentPosition: FlatBlockEntity, moveToPosition: FlatBlockEntity) {
    this.moveToPosition = moveToPosition;
    this.currentPosition = currentPosition;

    this.top = currentPosition.y < moveToPosition.y;
    this.bottom = currentPosition.y > moveToPosition.y;
    this.right = currentPosition.x < moveToPosition.x;
    this.left = currentPosition.x > moveToPosition.x;
  }


}
