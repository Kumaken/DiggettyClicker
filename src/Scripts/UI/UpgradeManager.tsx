import { UpgradeData } from '../Data/UpgradeData';
import { TabEntry } from './TabEntry';
import { IUpgradeData } from '../Interfaces/IUpgradeData';

export default class UpgradeManager {
  private upgradeProgress = {};

  constructor() {
    for (let key in UpgradeData) {
      console.log(key);
      this.upgradeProgress[key] = 0;
    }

    // this.upgradeProgress = {
    //   [UpgradeData.Pickaxe.key]: 0,
    //   [UpgradeData.Bicep.key]: 0
    // };
  }

  createUpgradeEntry(upgradeData: IUpgradeData) {
    return TabEntry(upgradeData, 10);
  }
  createUpgradeList() {
    const upgrades = [];
    for (let key in UpgradeData) {
      console.log(key);
      upgrades.push(this.createUpgradeEntry(UpgradeData[key]));
    }
    return upgrades;
  }
}
