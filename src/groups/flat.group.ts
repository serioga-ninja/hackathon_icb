import { EGroupTypes, GroupBase } from '../core/group.base';

export class FlatGroup extends GroupBase {

  get groupType() {
    return EGroupTypes.Flat;
  }
}
