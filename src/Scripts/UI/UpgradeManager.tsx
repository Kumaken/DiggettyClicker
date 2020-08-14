import { UpgradeData } from '../Data/UpgradeData';
import { TabEntry } from './TabEntry';
import { IUpgradeData } from '../Interfaces/IUpgradeData';

export default class UpgradeManager {
  private upgradeProgress = {};
  private gameScene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.gameScene = scene;
    for (let key in UpgradeData) {
      console.log(key);
      this.upgradeProgress[key] = 0;
    }

    // this.upgradeProgress = {
    //   [UpgradeData.Pickaxe.key]: 0,
    //   [UpgradeData.Bicep.key]: 0
    // };
  }

  createUpgradeEntry(key: string, upgradeData: IUpgradeData) {
    return TabEntry(key, upgradeData, 10, this.gameScene);
  }
  createUpgradeList() {
    const upgrades = [];
    for (let key in UpgradeData) {
      console.log(key);
      upgrades.push(this.createUpgradeEntry(key, UpgradeData[key]));
    }
    return upgrades;
  }
}
