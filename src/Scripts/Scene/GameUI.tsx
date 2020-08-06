import * as Phaser from 'phaser';
import { SubscriptionLike } from 'rxjs';
import TimerUtil, { DISPLAY_MODE } from '../Util/TimerUtil';
import SceneKeys from '../Config/SceneKeys';
import AlignTool from '../Util/AlignTool';
import AnimationHelper from '../Util/AnimationHelper';
import FontKeys from '../Config/FontKeys';
import PreloadScene from './PreloadScene';
import GameEvents from '../Config/GameEvents';
import { TextureKeys } from '../Config/TextureKeys';
import Button from '../UI/Button';
import ToughnessBar from '../UI/ToughnessBar';
import { IPlatformData } from '../Interfaces/IPlatformData';
import PlatformManager from '../Object/PlatformManager';
import BottomTab from '../UI/BottomTab';
import { DepthString, GoldString } from '../Data/TextString';
import UIText from '../UI/UIText';
import { Title, SubTitle } from '../UI/TextElements';

export default class GameUI extends Phaser.Scene {
  private depthText?: Phaser.GameObjects.DOMElement;
  private goldText?: Phaser.GameObjects.DOMElement;
  private gameScene: Phaser.Scene;
  private platformToughnessBar: Phaser.GameObjects.DOMElement;

  constructor() {
    super({ key: SceneKeys.GameUI });
  }

  init(): void {}

  setupTexts() {
    this.depthText = new UIText(
      this,
      AlignTool.getXfromScreenWidth(this, 0.5),
      AlignTool.getYfromScreenHeight(this, 0.2),
      Title(DepthString(0))
    );
    this.goldText = new UIText(
      this,
      AlignTool.getXfromScreenWidth(this, 0.5),
      AlignTool.getYfromScreenHeight(this, 0.05),
      SubTitle(GoldString(0))
    );
  }

  setupButtons() {
    const button = this.add.dom(400, 300, Button);
    button.addListener('click').on('click', () => {
      console.log('clicked');
    });
  }

  createBottomTab() {
    this.add.dom(
      AlignTool.getCenterHorizontal(this),
      AlignTool.getCenterVertical(this),
      BottomTab
    );
  }

  create(): void {
    this.gameScene = this.scene.get(SceneKeys.Game);
    this.setupTexts();
    this.setupButtons();
    this.platformToughnessBar = new ToughnessBar(
      this,
      AlignTool.getCenterHorizontal(this.gameScene),
      PlatformManager.topMostY
    );
    this.createBottomTab();

    // listen for events:
    this.gameScene.events.on(
      GameEvents.OnDepthChanged,
      (value) => {
        this.depthText.update(Title(DepthString(value)));
      },
      this
    );
    this.gameScene.events.on(
      GameEvents.OnGoldChanged,
      (value) => {
        this.goldText.update(SubTitle(GoldString(value)));
      },
      this
    );
    this.gameScene.events.on(
      GameEvents.OnDamage,
      () => {
        const { platformData, toughness } = PlatformManager.topMostPlatform;
        this.platformToughnessBar.update(
          platformData.name,
          toughness,
          platformData.toughness
        );
      },
      this
    );
  }
}
