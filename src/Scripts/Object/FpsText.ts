import * as Phaser from 'phaser';

export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(scene, 10, 10, '', { color: 'white', fontSize: '28px' });
    scene.add.existing(this);
    this.setOrigin(0);
  }

  update() {
    this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`);
  }
}
