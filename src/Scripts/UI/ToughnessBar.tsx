import React from './jsx-dom-shim';
import './style.css';
import PlatformManager from '../Object/PlatformManager';
import AlignTool from '../Util/AlignTool';

const HealthBar = (name: string, value: number, maxToughness: number) =>
  (
    <div className="health-bar">
      <span className="platform-name">{name}</span>
      <span className="platform-toughness">{value}</span>
      <progress
        class="progress is-small is-danger"
        value={value}
        max={maxToughness}
      ></progress>
    </div>
  ) as HTMLElement;

export default class ToughnessBar extends Phaser.GameObjects.DOMElement {
  public scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const { platformData, toughness } = PlatformManager.topMostPlatform;
    const offsetY = 50 * AlignTool.getScaleScreenWidth(scene);
    console.log(y, offsetY);
    super(
      scene,
      x,
      y - offsetY,
      HealthBar(platformData.name, toughness, platformData.toughness)
    );
    scene.add.existing(this); // this is needed for positioning
    this.scene = scene;
  }

  public update(name: string, toughness: number, maxToughness: number) {
    this.setElement(HealthBar(name, toughness, maxToughness));
  }
}
