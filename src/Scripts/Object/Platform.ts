import 'phaser';
import AlignTool from '../Util/AlignTool';
import DepthConfig from '../Config/DepthConfig';
import BubbleColorConfig from '../Config/BubbleColorConfig';
import { Color } from '../Config/ColorConfig';
import { ITile } from '../Interfaces/ITile';
import { ITilePool } from '../Interfaces/ITilePool';
import TextureKeys from '../Config/TextureKeys';
import Tile from './Tile';
import TilePool from './TilePool';

export default class Platform {
  private row: ITile[] = [];
  private rowSize: number = 10;
  private scene: Phaser.Scene;
  private pool: ITilePool;
  private textureKey: string;
  private y: number;
  private effRightX: number;
  private effLeftX: number;
  private tileSize: Phaser.Structs.Size;

  constructor(scene: Phaser.Scene, pool: ITilePool, key: string, y: number) {
    this.scene = scene;
    this.pool = pool;
    this.textureKey = key;
    this.effLeftX = AlignTool.getXfromScreenWidth(scene, 0.1);
    this.effRightX = AlignTool.getXfromScreenWidth(scene, 0.9);
    this.y = y;
    // deduce each tile size dynamically:
    const sample = this.pool.spawn(0, 0, this.textureKey, 0);
    this.tileSize = new Phaser.Structs.Size(
      sample.displayWidth,
      sample.displayHeight
    );
    this.pool.despawn(sample);
    this.generateRow();
  }

  generateRow() {
    let curX = this.effLeftX;
    for (let i = 0; i < this.rowSize; i += 1) {
      // Todo: randomize frame here
      const newTile: ITile = this.pool.spawn(
        curX,
        this.y,
        this.textureKey,
        104
      );
      this.row.push(newTile);
      curX += this.tileSize.width;
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
