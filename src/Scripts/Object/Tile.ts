import 'phaser';
import AlignTool from '../Util/AlignTool';
import DepthConfig from '../Config/DepthConfig';
import BubbleColorConfig from '../Config/BubbleColorConfig';
import { Color } from '../Config/ColorConfig';
import { ITile } from '../Interfaces/ITile';
import { TexturePreloadKeys } from '../Config/TexturePreloadKeys';

export default class Tile extends Phaser.Physics.Arcade.Sprite
  implements ITile {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number
  ) {
    super(scene, x, y, texture, frame);
  }
}
