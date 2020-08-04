import 'phaser';
import AlignTool from '../Util/AlignTool';
import DepthConfig from '../Config/DepthConfig';
import BubbleColorConfig from '../Config/BubbleColorConfig';
import { Color } from '../Config/ColorConfig';
import { ITile } from '../Interfaces/ITile';
import { ITilePool } from '../Interfaces/ITilePool';
import { TextureKeys } from '../Config/TextureKeys';
import Tile from './Tile';
import TilePool from './TilePool';
import Player from './Player';
import GameEvents from '../Config/GameEvents';

export default class Platform {
  public row: ITile[] = [];
  private rowSize: number = 9;

  private scene: Phaser.Scene;
  private pool: ITilePool;
  private textureKey: string;
  private y: number;
  private effRightX: number;
  private effLeftX: number;
  private tileSize: Phaser.Structs.Size;

  // Platform Stats:
  private toughness: number;

  constructor(
    scene: Phaser.Scene,
    pool: ITilePool,
    key: string,
    y: number,
    tileSize: Phaser.Structs.Size,
    frame: number = 104
  ) {
    this.scene = scene;
    this.pool = pool;
    this.textureKey = key;
    this.effLeftX = AlignTool.getXfromScreenWidth(scene, 0.115);
    this.effRightX = AlignTool.getXfromScreenWidth(scene, 0.8);
    this.y = y;
    this.tileSize = tileSize;
    // Stats initialization:
    this.toughness = 0;
    this.generateRow(frame);
  }

  generateRow(frame: number) {
    let curX = this.effLeftX;

    for (let i = 0; i < this.rowSize; i += 1) {
      // Todo: randomize frame here
      const newTile: ITile = this.pool.spawn(
        curX,
        this.y,
        this.textureKey,
        frame // 104 frame number
      );
      this.row.push(newTile);
      curX += this.tileSize.width;
    }
    curX = this.effLeftX;
  }

  shiftAllTilesUpward() {
    this.row.forEach((tile) => {
      tile.y -= this.tileSize.height;
    });
  }

  // Events:
  onDestruction() {
    this.scene.game.events.emit(GameEvents.TopmostPlatformDestroyed);
  }

  onClickPlatform() {
    this.damage(Player.clickDamage);
  }

  // Platform stats methods:
  damage(amount: number) {
    if (amount >= this.toughness) this.onDestruction();
    else {
      this.toughness -= amount;
    }
  }
}

// Phaser.GameObjects.GameObjectFactory.register('bubble', function (
//   x: number,
//   y: number,
//   texture: string,
//   frame: string = ''
// ) {
//   // @ts-ignore
//   var ball = new Ball(this.scene, x, y, texture, frame);

//   // @ts-ignore
//   this.displayList.add(ball);
//   // @ts-ignore
//   this.updateList.add(ball);
//   // @ts-ignore
//   this.scene.physics.world.enableBody(ball, Phaser.Physics.Arcade.DYNAMIC_BODY);

//   ball.setCircle(ball.width * 0.5);

//   return ball;
// });
