import 'phaser';
import { IDamageTextPool } from '../Interfaces/IDamageTextPool';
import AlignTool from '../Util/AlignTool';
import Algorithm from '../Util/Algorithm';
import GameEvents from '../Config/GameEvents';
import PreloadScene from '../Scene/PreloadScene';
import FontKeys from '../Config/FontKeys';

export default class DamageTextPool extends Phaser.GameObjects.Group
  implements IDamageTextPool {
  constructor(
    scene: Phaser.Scene,
    config: Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
  ) {
    const defaults: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
      classType: Phaser.GameObjects.Text,
      active: false,
      visible: false,
      frameQuantity: 10
    };
    super(scene, Object.assign(defaults, config));
  }

  spawn(x: number, y: number, damage: number): Phaser.GameObjects.Text {
    const spawnExisting = this.countActive(false) > 0;
    const DamageText: Phaser.GameObjects.Text = this.get(x, y - 50);
    if (!DamageText) {
      return DamageText;
    }

    if (spawnExisting) {
      DamageText.setVisible(true);
      DamageText.setActive(true);
    }

    DamageText.text = damage.toLocaleString();
    DamageText.setFontSize(80 * PreloadScene.screenScale.scaleWidth);
    DamageText.setFontFamily(FontKeys.SHPinscherRegular);
    AlignTool.scaleToScreenWidth(this.scene, DamageText, 0.05);

    // Animation:
    this.scene.tweens.add({
      targets: DamageText,
      x: x + Algorithm.randomIntFromInterval(-100, 100),
      y: y + Algorithm.randomIntFromInterval(-100, 0),
      duration: 1500,
      alpha: 0,
      ease: 'Power2',
      onComplete: () => {
        this.despawn(DamageText);
      }
    });
    return DamageText;
  }

  despawn(DamageText: Phaser.GameObjects.Text): void {
    this.killAndHide(DamageText);
    DamageText.alpha = 1;
    // DamageText.anims.stop();
  }
}

// Register to gameobject factory (Module Augmentation)
Phaser.GameObjects.GameObjectFactory.register('damageTextPool', function (
  config: Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
) {
  const pool = new DamageTextPool(this.scene, config);

  this.updateList.add(pool);

  // listen to damage events:
  this.scene.game.events.on(
    GameEvents.OnDamage,
    (y, damage) => {
      pool.spawn(AlignTool.getCenterHorizontal(this.scene), y, damage);
    },
    this
  );
  return pool;
});
