import UpgradeManager from './UpgradeManager';
import AlignTool from '../Util/AlignTool';
import BottomTab from '../UI/BottomTab';

export default class BottomMenuManager {
  private UpgradeManager: UpgradeManager;
  private gameScene: Phaser.Scene;
  public static bottomMenuStartY: number; // in percentage

  constructor(scene: Phaser.Scene) {
    this.UpgradeManager = new UpgradeManager(scene);
    this.gameScene = scene;

    BottomMenuManager.bottomMenuStartY = 0.854;
  }

  createBottomMenu() {
    this.gameScene.add.dom(
      AlignTool.getCenterHorizontal(this.gameScene),
      AlignTool.getYfromScreenHeight(
        this.gameScene,
        BottomMenuManager.bottomMenuStartY
      ),
      BottomTab(this.UpgradeManager.createUpgradeList())
    );
  }
}
