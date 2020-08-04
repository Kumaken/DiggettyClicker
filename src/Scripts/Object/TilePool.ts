import 'phaser';
// import tile from './tile';
// import { Itile } from '../Interfaces/Itile';
// import { IStatictilePool } from '../Interfaces/IStatictilePool';
// import ColorConfig from '../Config/ColorConfig';
import PreloadScene from '../Scene/PreloadScene';
import Tile from './Tile';
import { ITilePool } from '../Interfaces/ITilePool';
import AlignTool from '../Util/AlignTool';

export default class TilePool extends Phaser.Physics.Arcade.Group
  implements ITilePool {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    texture: string,
    config:
      | Phaser.Types.Physics.Arcade.PhysicsGroupConfig
      | Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
  ) {
    const defaults:
      | Phaser.Types.Physics.Arcade.PhysicsGroupConfig
      | Phaser.Types.GameObjects.Group.GroupCreateConfig = {
      classType: Tile,
      maxSize: -1,
      key: texture,
      frame: 0,
      active: false,
      visible: false,
      frameQuantity: 10
    };

    super(world, scene, Object.assign(defaults, config));
  }

  spawn(x: number, y: number, key: string, frame: number): Tile {
    const spawnExisting = this.countActive(false) > 0;
    const tile: Tile = this.get(x, y, key, frame);
    if (!tile) {
      return tile;
    }

    tile.setTexture(key);
    tile.setFrame(frame);
    // tile.giveCircleCollider();
    // tile.emit('on-spawned');

    if (spawnExisting) {
      tile.setVisible(true);
      tile.setActive(true);
      this.world.add(tile.body);
      // tile.randomizeColor();
    }

    AlignTool.scaleToScreenWidth(this.scene, tile, 0.11);
    // tile.setScale(
    //   PreloadScene.screenScale.scaleWidth,
    //   PreloadScene.screenScale.scaleHeight
    // );
    tile.setInteractive();
    return tile;
  }

  despawn(tile: Tile): void {
    this.killAndHide(tile);
    this.world.remove(tile.body);
    tile.alpha = 1;
    tile.body.reset(0, 0);
    tile.disableInteractive();
    // tile.anims.stop();
  }
}

// Register to gameobject factory (Module Augmentation)
Phaser.GameObjects.GameObjectFactory.register('tilePool', function (
  texture: string,
  config:
    | Phaser.Types.Physics.Arcade.PhysicsGroupConfig
    | Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
) {
  const pool = new TilePool(
    this.scene.physics.world,
    this.scene,
    texture,
    config
  );

  this.updateList.add(pool);

  return pool;
});
