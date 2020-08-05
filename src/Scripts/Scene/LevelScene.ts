import * as Phaser from 'phaser';
import FpsText from '../Object/FpsText';
import PlatformManager from '../Object/PlatformManager';
import { ITilePool } from '../Interfaces/ITilePool';
import { TextureKeys } from '../Config/TextureKeys';
import SceneKeys from '../Config/SceneKeys';
import Player from '../Object/Player';
import GameUI from './GameUI';
import { IDamageTextPool } from '../Interfaces/IDamageTextPool';

import '../Object/TilePool';
import '../Object/DamageTextPool';
export default class LevelScene extends Phaser.Scene {
  private fpsText: FpsText;
  private platformManager: PlatformManager;
  private player: Player;
  private gameUI: GameUI;
  constructor() {
    const sceneConfig = {
      key: SceneKeys.Game,
      mapAdd: { isoPlugin: 'iso' }
    };
    super(sceneConfig);
  }

  preload(): void {}

  create(): void {
    this.player = new Player(this);
    const TilePool: ITilePool = this.add.tilePool(TextureKeys.TL_DIRT.key);
    const DamageTextPool: IDamageTextPool = this.add.damageTextPool();
    this.platformManager = new PlatformManager(this, TilePool, this.player);
    this.platformManager.spawnPlatformInitial(TextureKeys.TL_DIRT);

    // UI ---
    this.fpsText = new FpsText(this);
    this.scene.run(SceneKeys.GameUI, {});
    this.gameUI = this.scene.get(SceneKeys.GameUI) as GameUI;
    this.scene.bringToTop(SceneKeys.GameUI);
  }

  update(): void {
    this.fpsText.update();
  }
}
