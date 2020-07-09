export enum EGroupTypes {
  Doors,
  Room,
  Flat,
  NotMovableBlocks,
  Walls,
  ElectricDevices,
  WaterDevices,
}

export abstract class GroupBase extends Phaser.GameObjects.Group {

  abstract groupType: EGroupTypes;

  groupId: string;

  constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(scene, children, config);

    this.groupId = Math.ceil(Math.random() * 10000).toString() + new Date().getTime();
  }
}
