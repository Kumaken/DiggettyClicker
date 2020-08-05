import 'phaser';
import GameEvents from '../Config/GameEvents';

export default class Player {
  private scene: Phaser.Scene;
  private gold: number;
  private depth: number;
  public static clickDamage: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.gold = 0;
    this.depth = 0;
    Player.clickDamage = 1;
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
