import * as Phaser from 'phaser';
import TextureKeys from '../Config/TextureKeys';
import SceneKeys from '../Config/SceneKeys';
import GameEvents from '../Config/GameEvents';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preload });
  }

  preload(): void {
    /* all the routes here is referenced from root! */
    this.load.spritesheet(
      TextureKeys.TL_DIRT,
      'src/Assets/Tiles/dirt_Tiles_407.png',
      { frameWidth: 18, frameHeight: 18 }
    );

    this.game.events.once(
      GameEvents.PreloadFinished,
      this.handlePreloadFinished,
      this
    );
  }

  create(): void {
    this.game.events.emit(GameEvents.PreloadFinished);
  }

  private handlePreloadFinished() {
    this.scene.stop(SceneKeys.Preload);
    this.scene.start(SceneKeys.Game);
  }
}
