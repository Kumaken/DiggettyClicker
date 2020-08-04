import * as Phaser from 'phaser';
import { TextureKeys } from '../Config/TextureKeys';
import SceneKeys from '../Config/SceneKeys';
import GameEvents from '../Config/GameEvents';
import AlignTool from '../Util/AlignTool';

export default class PreloadScene extends Phaser.Scene {
  static screenScale: {
    scaleWidth: number;
    scaleHeight: number;
  };
  private tileFrameWidth: number = 17.9;
  private tileFrameHeight: number = 17.9;

  constructor() {
    super({ key: SceneKeys.Preload });
  }

  preload(): void {
    /* all the routes here is referenced from root! */
    this.load.spritesheet(
      TextureKeys.TL_DIRT.key,
      'src/Assets/Tiles/dirt_Tiles_407.png',
      { frameWidth: this.tileFrameWidth, frameHeight: this.tileFrameHeight }
    );

    this.game.events.once(
      GameEvents.PreloadFinished,
      this.handlePreloadFinished,
      this
    );
  }

  create(): void {
    PreloadScene.screenScale = AlignTool.getScaleScreen(this);

    this.game.events.emit(GameEvents.PreloadFinished);
  }

  private handlePreloadFinished() {
    this.scene.stop(SceneKeys.Preload);
    this.scene.start(SceneKeys.Game);
  }
}
