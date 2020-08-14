import UpgradeManager from './UpgradeManager';
import AlignTool from '../Util/AlignTool';
import BottomTab from '../UI/BottomTab';

export default class BottomMenuManager {
  private UpgradeManager: UpgradeManager;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, upgradeManager: UpgradeManager) {
    this.UpgradeManager = upgradeManager;
    this.scene = scene;
  }

  createBottomMenu() {
    this.scene.add.dom(
      AlignTool.getCenterHorizontal(this.scene),
      AlignTool.getYfromScreenHeight(this.scene, 0.845),
      BottomTab(this.UpgradeManager.createUpgradeList())
    );
  }
}
