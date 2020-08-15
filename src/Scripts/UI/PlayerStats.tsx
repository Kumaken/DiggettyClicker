import 'phaser';
import AlignTool from '../Util/AlignTool';
import BottomMenuManager from './BottomMenuManager';
import { TextureKeys } from '../Config/TextureKeys';
import React from './jsx-dom-shim';
import Player from '../Object/Player';
import GameEvents from '../Config/GameEvents';
import { StatsText } from './TextElements';

export default class PlayerStats {
  private gameScene: Phaser.Scene;
  private DPSText: Phaser.GameObjects.DOMElement;

  updateDPSUI() {
    this.DPSText.setElement(StatsText(Player.clickDamage));
  }

  createDPSUI() {
    this.DPSText = this.gameScene.add.dom(
      AlignTool.getXfromScreenWidth(this.gameScene, 0.12),
      AlignTool.getYfromScreenHeight(
        this.gameScene,
        BottomMenuManager.bottomMenuStartY - 0.175
      ),
      StatsText(Player.clickDamage)
    );

    const img = this.gameScene.add.image(
      AlignTool.getXfromScreenWidth(this.gameScene, 0.05),
      AlignTool.getYfromScreenHeight(
        this.gameScene,
        BottomMenuManager.bottomMenuStartY - 0.181
      ),
      TextureKeys.IC_PICKAXE.key,
      TextureKeys.IC_PICKAXE.frame[0]
    );
    AlignTool.scaleToScreenWidth(this.gameScene, img, 0.08);

    // listen to game events:
    this.gameScene.events.on(GameEvents.OnUpgradeDone, this.updateDPSUI, this);
  }

  constructor(scene: Phaser.Scene) {
    this.gameScene = scene;
    this.createDPSUI();
  }
}
