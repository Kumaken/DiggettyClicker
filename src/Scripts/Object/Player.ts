import 'phaser';
import GameEvents from '../Config/GameEvents';
import UpgradeProgressManager from './UpgradeProgress';

export default class Player {
  private scene: Phaser.Scene;
  private gold: number;
  private depth: number;
  private upgradeProgress: UpgradeProgressManager;
  public static clickDamage: number;

  handleUpgrade(key: string) {
    this.upgradeProgress.levelUpProgress(key);
    const dmgChange = this.upgradeProgress.calculateDamageIncrease(key);
    Player.clickDamage += dmgChange;

    this.scene.events.emit(GameEvents.OnUpgradeDone);
  }

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.gold = 0;
    this.depth = 0;
    this.upgradeProgress = new UpgradeProgressManager(this.scene);
    Player.clickDamage = 1;

    // listen to game events (with params):
    this.scene.events.on(
      GameEvents.OnUpgradeIssued,
      (key: string) => this.handleUpgrade(key),
      this
    );
  }

  addGold(amount: number) {
    this.gold += amount;
    this.scene.events.emit(GameEvents.OnGoldChanged, this.gold);
  }

  spendGold(amount: number) {
    this.gold -= amount;
    this.scene.events.emit(GameEvents.OnGoldChanged, this.gold);
  }

  addDepth(amount: number) {
    this.depth += amount;
    this.scene.events.emit(GameEvents.OnDepthChanged, this.depth);
  }
}
