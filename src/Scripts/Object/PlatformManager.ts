import 'phaser';
import AlignTool from '../Util/AlignTool';
import DepthConfig from '../Config/DepthConfig';
import BubbleColorConfig from '../Config/BubbleColorConfig';
import { Color } from '../Config/ColorConfig';
import { TextureKeys } from '../Config/TextureKeys';
import { IPlatformData } from '../Interfaces/IPlatformData';
import { ITextureKey } from '../Interfaces/ITextureKey';
import { ITilePool } from '../Interfaces/ITilePool';
import Platform from './Platform';
import GameEvents from '../Config/GameEvents';
import { PlatformData } from '../Data/PlatformData';
import Player from './Player';

export default class PlatformManager {
  private scene: Phaser.Scene;
  private pool: ITilePool;
  private player: Player;
  private topMostY: number;
  private bottomMostY: number;
  private platformYInterval: number;
  private platforms: Platform[] = [];
  private tileSize: Phaser.Structs.Size;
  private rowNums: number = 6;

  // NOTE DELETE THIS IF NOT USING TERRARIA TILES: to handle the gap from the tilesheet
  private tileWidthGap: number = 10;
  private tileHeightGap: number = 10;

  // Gameplay Related properties
  private depthPerPlatform: number = 10;
  private goldPerPlatform: number = 1;

  constructor(scene: Phaser.Scene, pool: ITilePool, player: Player) {
    this.scene = scene;
    this.pool = pool;
    this.player = player;
    this.topMostY = AlignTool.getYfromScreenHeight(scene, 0.68);

    // deduce tile size dynamically:
    const sample = this.pool.spawn(0, 0, '', 0);
    this.tileSize = new Phaser.Structs.Size(
      sample.displayWidth - this.tileWidthGap,
      sample.displayHeight - this.tileHeightGap
    );
    this.pool.despawn(sample);

    // listen to game events:
    this.scene.game.events.on(
      GameEvents.TopmostPlatformDestroyed,
      this.destroyTopmostPlatform,
      this
    );

    this.scene.input.on('gameobjectdown', (pointer, gameObject) => {
      // damage topmost platform:
      const topMostPlatform = this.platforms[0];
      topMostPlatform.onClickPlatform();
    });
  }

  // spawnPlatformTopmost(key: string) {
  //   const newPlatform = new Platform(
  //     this.scene,
  //     this.pool,
  //     key,
  //     this.topMostY,
  //     this.tileSize
  //   );
  //   this.platforms.push(newPlatform);
  // }

  spawnPlatformInitial(textureKey: ITextureKey) {
    let curY = this.topMostY;
    for (let i = 0; i < this.rowNums; i++) {
      const newPlatform = new Platform(
        this.scene,
        this.pool,
        curY,
        this.tileSize,
        PlatformData.Dirt
      );
      this.platforms.push(newPlatform);
      curY += this.tileSize.height;
    }
    this.bottomMostY = curY - this.tileSize.height;
  }

  despawnTopmostPlatform() {
    const topMost = this.platforms.shift().row;
    topMost.forEach((tile) => {
      this.pool.despawn(tile);
    });
  }

  shiftAllPlatformsUpward() {
    this.platforms.forEach((platform) => {
      platform.shiftAllTilesUpward();
    });
  }

  spawnBottommostPlatform(platformData: IPlatformData) {
    const newPlatform = new Platform(
      this.scene,
      this.pool,
      this.bottomMostY,
      this.tileSize,
      platformData
    );
    this.platforms.push(newPlatform);
  }

  destroyTopmostPlatform() {
    this.player.addDepth(this.depthPerPlatform);
    this.player.addGold(this.goldPerPlatform);
    this.despawnTopmostPlatform();
    this.shiftAllPlatformsUpward();
    this.spawnBottommostPlatform(PlatformData.RockyDirt);
  }
}
