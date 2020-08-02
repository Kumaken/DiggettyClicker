import * as Phaser from 'phaser';
import FpsText from '../Object/FpsText';
import '../Object/TilePool';
import PlatformManager from '../Object/PlatformManager';
import { ITilePool } from '../Interfaces/ITilePool';
import TextureKeys from '../Config/TextureKeys';
import SceneKeys from '../Config/SceneKeys';

export default class LevelScene extends Phaser.Scene {
  private fpsText: FpsText;
  private platformManager: PlatformManager;

  constructor() {
    const sceneConfig = {
      key: SceneKeys.Game,
      mapAdd: { isoPlugin: 'iso' }
    };
    super(sceneConfig);
  }

  preload(): void {}

  create(): void {
    this.fpsText = new FpsText(this);
    console.log('Entering Level Scene!');
    const TilePool: ITilePool = this.add.tilePool(TextureKeys.TL_DIRT);
    this.platformManager = new PlatformManager(this, TilePool);
    this.platformManager.spawnPlatformTopmost(TextureKeys.TL_DIRT);
  }

  update(): void {
    this.fpsText.update();
  }
}
