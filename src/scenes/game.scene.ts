export class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  /**
   * is called when the scene starts; this function may accept parameters, which are passed from other scenes or game
   * by calling scene.start(key, [params])
   */
  init(params: any): void {
    console.log('init');
  }

  /**
   * is called before the scene objects are created, and it contains loading assets; these assets are cached, so when
   * the scene is restarted, they are not reloaded
   */
  preload(): void {
  }

  /**
   * is called when the assets are loaded and usually contains creation of the main game objects (background, enemy,
   * obstacles, enemies, etc.)
   */
  create(): void {
  }

  /**
   * is called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
   */
  update(time: number): void {
  }
}
