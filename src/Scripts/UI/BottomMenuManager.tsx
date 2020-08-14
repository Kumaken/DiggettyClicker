import UpgradeManager from './UpgradeManager';
import AlignTool from '../Util/AlignTool';
import BottomTab from '../UI/BottomTab';

export default class BottomMenuManager {
  private UpgradeManager: UpgradeManager;
  private gameScene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.UpgradeManager = new UpgradeManager(scene);
    this.gameScene = scene;
  }

  createBottomMenu() {
    this.gameScene.add.dom(
      AlignTool.getCenterHorizontal(this.gameScene),
      AlignTool.getYfromScreenHeight(this.gameScene, 0.845),
      BottomTab(this.UpgradeManager.createUpgradeList())
    );
  }
}
