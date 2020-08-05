import * as Phaser from 'phaser';
import { SubscriptionLike } from 'rxjs';
import TimerUtil, { DISPLAY_MODE } from '../Util/TimerUtil';
import SceneKeys from '../Config/SceneKeys';
import AlignTool from '../Util/AlignTool';
import AnimationHelper from '../Util/AnimationHelper';
import FontKeys from '../Config/FontKeys';
import PreloadScene from './PreloadScene';
import GameEvents from '../Config/GameEvents';
import { QuantityBar } from 'phaser-ui-tools';
import { TextureKeys } from '../Config/TextureKeys';
import Button from '../UI/Button';

export default class GameUI extends Phaser.Scene {
  private depthText?: Phaser.GameObjects.Text;
  private goldText?: Phaser.GameObjects.Text;
  private gameScene: Phaser.Scene;
  private quantityBar: QuantityBar;

  constructor() {
    super({ key: SceneKeys.GameUI });
  }

  init(): void {}

  private generateDepthString(value: number) {
    return `${value.toLocaleString()} km`;
  }

  private createDepthText(value: number) {
    this.depthText = this.add
      .text(
        AlignTool.getXfromScreenWidth(this, 0.5),
        AlignTool.getYfromScreenHeight(this, 0.2),
        this.generateDepthString(value),
        {
          fontSize: 80 * PreloadScene.screenScale.scaleWidth,
          fontFamily: FontKeys.SHPinscherRegular
        }
      )
      .setOrigin(0.5, 0.5)
      .setAlpha(0.75);
  }

  private updateDepthText(value: number) {
    this.depthText.text = this.generateDepthString(value);
  }

  private generateGoldString(value: number) {
    return `${value.toLocaleString()} G`;
  }

  private createGoldText(value: number) {
    this.goldText = this.add
      .text(
        AlignTool.getXfromScreenWidth(this, 0.5),
        AlignTool.getYfromScreenHeight(this, 0.02),
        this.generateGoldString(value),
        {
          fontSize: 40 * PreloadScene.screenScale.scaleWidth,
          fontFamily: FontKeys.SilkScreenA
        }
      )
      .setOrigin(0.5, 0.5)
      .setFontFamily(FontKeys.SilkScreenA);
  }

  private updateGoldText(value: number) {
    this.goldText.text = this.generateGoldString(value);
  }

  setupTexts() {
    this.createDepthText(0);
    this.createGoldText(0);
  }

  setupButtons() {
    const button = this.add.dom(400, 300, Button);
    button.addListener('click').on('click', () => {
      console.log('clicked');
    });
  }

  create(): void {
    this.gameScene = this.scene.get(SceneKeys.Game);
    this.setupTexts();

    this.quantityBar = new QuantityBar(
      this.gameScene,
      { x: 300, y: 200 },
      { startValue: 50, maxValue: 200 },
      false,
      false,
      TextureKeys.VB_TRACK.key,
      TextureKeys.VB_BAR.key,
      { duration: 100, ease: 'linear' }
    );

    // listen for events:
    this.gameScene.events.on(
      GameEvents.OnDepthChanged,
      (value) => {
        this.updateDepthText(value);
      },
      this
    );
    this.gameScene.events.on(
      GameEvents.OnGoldChanged,
      (value) => {
        this.updateGoldText(value);
      },
      this
    );
  }
}
