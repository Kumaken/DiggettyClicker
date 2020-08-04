import 'phaser';

export default class Player {
  private scene: Phaser.Scene;
  private gold: number;
  public static clickDamage: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.gold = 0;
    Player.clickDamage = 0;
  }

  addGold(amount: number) {
    this.gold += amount;
  }

  spendGold(amount: number) {
    this.gold -= amount;
  }
}
