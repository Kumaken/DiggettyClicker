import * as Phaser from 'phaser';
import { TexturePreloadKeys } from '../Config/TexturePreloadKeys';
import SceneKeys from '../Config/SceneKeys';
import GameEvents from '../Config/GameEvents';
import AlignTool from '../Util/AlignTool';

export default class PreloadScene extends Phaser.Scene {
  private assetRoot = 'src/Assets/';
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
    this.load.image(
      TexturePreloadKeys.VB_TRACK.key,
      `${this.assetRoot}QuantityBar/track.png`
    );

    this.load.spritesheet(
      TexturePreloadKeys.TL_DIRT.key,
      this.assetRoot + 'Tiles/dirt_Tiles_407.png',
      { frameWidth: this.tileFrameWidth, frameHeight: this.tileFrameHeight }
    );

    this.load.spritesheet(
      TexturePreloadKeys.VB_BAR.key,
      `${this.assetRoot}QuantityBar/bar.png`,
      { frameWidth: 260, frameHeight: 32 }
    );

    // Load Icons:
    this.load.spritesheet(
      TexturePreloadKeys.IC_MINECRAFT.key,
      `${this.assetRoot}Icons/minecraft_transparent.png`,
      { frameWidth: 18, frameHeight: 18 }
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
