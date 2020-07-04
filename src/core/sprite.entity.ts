export abstract class SpriteEntity extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
    }
}
