/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
import 'phaser';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './Constant';

type ObjectTransform = any;
// | (Phaser.GameObjects.GameObject &
//     Phaser.GameObjects.Components.Transform &
//     Phaser.GameObjects.Components.Size)
// | Phaser.GameObjects.Arc
// | Phaser.GameObjects.Container
// | Phaser.GameObjects.TileSprite
// | Phaser.GameObjects.Text;

export default class AlignTool {
  /**
   * Give pulsating animation to an object
   * @param scene the current game scene
   * @param object target object to align
   * @param percentage percentage of screen width
   */
  static scaleToScreenWidth(
    scene: Phaser.Scene,
    obj: ObjectTransform,
    percentage: number
  ) {
    obj.displayWidth = scene.cameras.main.width * percentage;
    obj.scaleY = obj.scaleX;
  }

  /**
   * Give pulsating animation to an object
   * @param scene the current game scene
   * @param object target object to align
   * @param percentage percentage of screen height
   */
  static scaleToScreenHeight(
    scene: Phaser.Scene,
    obj: ObjectTransform,
    percentage: number
  ) {
    obj.displayHeight = scene.cameras.main.height * percentage;
    obj.scaleX = obj.scaleY;
  }

  /**
   * Fit the object width and height to screen width and height
   * @param scene the current game scene
   * @param object target object to align
   */
  static fitToScreen(scene: Phaser.Scene, obj: ObjectTransform) {
    obj.displayWidth = scene.cameras.main.width;
    obj.displayHeight = scene.cameras.main.height;
  }

  /**
   * Align object x position to screen percentage from width
   * @param scene the current game scene
   * @param object target object to align
   * @param percentage percentage of screen width
   */
  static alignX(scene: Phaser.Scene, obj: ObjectTransform, percentage: number) {
    obj.x = scene.cameras.main.width * percentage;
  }

  /**
   * Align object y position to screen percentage from height
   * @param scene the current game scene
   * @param object target object to align
   * @param percentage percentage of screen height
   */
  static alignY(scene: Phaser.Scene, obj: ObjectTransform, percentage: number) {
    obj.y = scene.cameras.main.height * percentage;
  }

  /**
   * Center the object horizontally
   * @param scene the current game scene
   * @param object target object to align
   */
  static centerHorizontal(scene: Phaser.Scene, obj: ObjectTransform) {
    obj.x = scene.cameras.main.width / 2;
  }

  /**
   * Center the object vertically
   * @param scene the current game scene
   * @param object target object to align
   */
  static centerVertical(scene: Phaser.Scene, obj: ObjectTransform) {
    obj.y = scene.cameras.main.height / 2;
  }

  /**
   * Center the object to screen center
   * @param scene the current game scene
   * @param object target object to align
   */
  static centerBoth(scene: Phaser.Scene, obj: ObjectTransform) {
    obj.x = scene.cameras.main.width / 2;
    obj.y = scene.cameras.main.height / 2;
  }

  /**
   * Get the screen center horizontal
   * @param scene the current game scene
   */
  static getCenterHorizontal(scene: Phaser.Scene) {
    return scene.cameras.main.width / 2;
  }

  /**
   * Get the screen center vertical
   * @param scene the current game scene
   */
  static getCenterVertical(scene: Phaser.Scene) {
    return scene.cameras.main.height / 2;
  }

  /**
   * Get the x position from percentage of screen width
   * @param scene the current game scene
   * @param percentage percentage of screen width
   */
  static getXfromScreenWidth(scene: Phaser.Scene, percentage: number) {
    return scene.cameras.main.width * percentage;
  }

  /**
   * Get the y position from percentage of screen height
   * @param scene the current game scene
   * @param percentage percentage of screen height
   */
  static getYfromScreenHeight(scene: Phaser.Scene, percentage: number) {
    return scene.cameras.main.height * percentage;
  }

  static getScaleScreenWidth(scene: Phaser.Scene) {
    return this.getScaleScreen(scene).scaleWidth;
  }

  static getScaleScreenHeight(scene: Phaser.Scene) {
    return this.getScaleScreen(scene).scaleHeight;
  }

  static getScaleScreen(scene: Phaser.Scene) {
    const { width, height } = scene.cameras.main;
    return {
      scaleWidth: width / DEFAULT_WIDTH,
      scaleHeight: height / DEFAULT_HEIGHT
    };
  }
}
