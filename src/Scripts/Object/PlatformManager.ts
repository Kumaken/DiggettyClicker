import 'phaser';
import AlignTool from '../Util/AlignTool';
import DepthConfig from '../Config/DepthConfig';
import BubbleColorConfig from '../Config/BubbleColorConfig';
import { Color } from '../Config/ColorConfig';
import TextureKeys from '../Config/TextureKeys';
import { ITilePool } from '../Interfaces/ITilePool';
import Platform from './Platform';

export default class PlatformManager {
  private scene: Phaser.Scene;
  private pool: ITilePool;
  private topMostY: number;
  private platforms: Platform[] = [];
  constructor(scene: Phaser.Scene, pool: ITilePool) {
    this.scene = scene;
    this.pool = pool;
    this.topMostY = AlignTool.getYfromScreenHeight(scene, 0.5);
  }

  spawnPlatformTopmost(key: string) {
    const newPlatform = new Platform(this.scene, this.pool, key, this.topMostY);
    this.platforms.push(newPlatform);
  }
}
