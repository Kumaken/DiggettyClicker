import AlignTool from './AlignTool';

class Tint {
  private tintPanel: Phaser.GameObjects.Rectangle | undefined;

  private static instance: Tint;

  public static get Instance() {
    const instance = this.instance || (this.instance = new this());
    return instance;
  }

  public tint(scene: Phaser.Scene, alpha = 0.5, color = 0x000000, depth = 1) {
    if (this.tintPanel === undefined) {
      this.tintPanel = scene.add.rectangle(
        AlignTool.getCenterHorizontal(scene),
        AlignTool.getCenterVertical(scene),
        scene.cameras.main.width,
        scene.cameras.main.height,
        color,
        alpha
      );
    } else {
      this.tintPanel.setVisible(true);
    }

    this.tintPanel.setDepth(depth);
  }

  public untint() {
    this.tintPanel?.setVisible(false);
  }
}

export const tintScreen = Tint.Instance;
