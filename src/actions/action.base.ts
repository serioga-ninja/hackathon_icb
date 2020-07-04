import { FlatBlockEntity } from '../entity/flat-block.entity';

export abstract class ActionBase {

  abstract readonly actionType: string;

  private block: FlatBlockEntity;

  constructor(block: FlatBlockEntity) {
    this.block = block;
  }
}
