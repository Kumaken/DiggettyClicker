import 'phaser';
import { IDamageTextPool } from '../Interfaces/IDamageTextPool';
import AlignTool from '../Util/AlignTool';
import Algorithm from '../Util/Algorithm';
import GameEvents from '../Config/GameEvents';
import PreloadScene from '../Scene/PreloadScene';
import FontKeys from '../Config/FontKeys';
import PlatformManager from './PlatformManager';
import Player from './Player';
import UIText from '../UI/UIText';
import { Title } from '../UI/TextElements';

export default class DamageTextPool extends Phaser.GameObjects.Group
  implements IDamageTextPool {
  public scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    config: Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
  ) {
    const defaults: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
      classType: Phaser.GameObjects.DOMElement,
      active: false,
      visible: false,
      frameQuantity: 10
    };
    super(scene, Object.assign(defaults, config));
  }

  spawn(x: number, y: number, damage: number): Phaser.GameObjects.DOMElement {
    const spawnExisting = this.countActive(false) > 0;
    // const DamageText: Phaser.GameObjects.DOMElement = this.get(x, y - 50);
    let DamageText: Phaser.GameObjects.DOMElement = this.getFirst(false);

    if (!DamageText) {
      // no more exists:
      DamageText = new UIText(this.scene, x, y, Title(`${damage}`));
      this.add(DamageText);
      // return DamageText;
    }

    if (spawnExisting) {
      DamageText.setVisible(true);
      DamageText.setActive(true);
      DamageText.update(Title(`${damage}`));
    }

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

  despawn(DamageText: Phaser.GameObjects.DOMElement): void {
    this.killAndHide(DamageText);
    DamageText.x = AlignTool.getCenterHorizontal(this.scene);
    DamageText.y = PlatformManager.topMostY;
    DamageText.alpha = 1;
  }
}

// Register to gameobject factory (Module Augmentation)
Phaser.GameObjects.GameObjectFactory.register('damageTextPool', function (
  config: Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
) {
  const pool = new DamageTextPool(this.scene, config);

  this.updateList.add(pool);

  // listen to damage events:
  this.scene.events.on(
    GameEvents.OnDamage,
    () => {
      pool.spawn(
        AlignTool.getCenterHorizontal(this.scene),
        PlatformManager.topMostY,
        Player.clickDamage
      );
    },
    this
  );
  return pool;
});
