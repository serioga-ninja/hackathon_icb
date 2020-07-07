export abstract class SpriteEntity extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  objID: string;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.objID = `${x}-${y}`;
    this.scene = scene;
    this.scene.add.existing(this).setInteractive();
    this.scene.physics.world.enableBody(this, 0);
  }
}
