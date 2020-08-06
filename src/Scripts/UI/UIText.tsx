import PlatformManager from '../Object/PlatformManager';
import AlignTool from '../Util/AlignTool';

export default class UIText extends Phaser.GameObjects.DOMElement {
  public scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number, element: HTMLElement) {
    super(scene, x, y, element);
    scene.add.existing(this); // this is needed for positioning
    this.scene = scene;
  }

  public update(element: HTMLElement) {
    this.setElement(element);
  }

  public gene;
}
