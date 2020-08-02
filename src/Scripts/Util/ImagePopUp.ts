import * as Phaser from 'phaser';
import AnimationHelper from './AnimationHelper';
import AlignTool from './AlignTool';

export enum ANIMATION_TYPE {
  EASE_IN = 0,
  FLASH_AND_RESIZE = 1,
  EMBIGGEN = 3,
  FLOAT_IN_FADE = 4
}

export interface IImageConfig {
  x: number;
  y: number;
  image: string;
  width: number;
  height: number;
  duration: number;

  color?: number;
  animType?: ANIMATION_TYPE;
  retain?: boolean;
}

class ImagePopUpHelper {
  private static instance: ImagePopUpHelper;

  public static get Instance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  private m_scene!: Phaser.Scene;

  private m_depth!: number;

  init(scene: Phaser.Scene, depth: number) {
    this.m_scene = scene;
    this.m_depth = depth;
    this.clear();
  }

  private m_imagePool: Phaser.GameObjects.Image[] = [];

  /**
   * Create an image pop up for a certain duration
   * @param scene the current game scene (Phaser.Scene)
   * @param x  position x (number)
   * @param y position u (number)
   * @param image the image's key (string)
   * @param width the image's final width (number)
   * @param height the image's final height (number)
   * @param duration the duration the image appear on screen in seconds (number)
   *
   * Optionals:
   * @param color the image's tint (number e.g. 0xffffff)
   * @param easeIn does the image has ease in animation (boolean)
   */
  showImage(config: IImageConfig) {
    if (!this.m_scene) {
      return undefined;
    }

    // Image setup
    let image: Phaser.GameObjects.Image;

    if (this.m_imagePool.length > 0) {
      image = this.m_imagePool.pop() as Phaser.GameObjects.Image;
    } else {
      image = this.m_scene.add.image(0, 0, '');
    }

    image
      ?.setActive(true)
      .setVisible(true)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .clearTint();

    image
      ?.setTexture(config.image)
      .setPosition(config.x, config.y)
      .setDisplaySize(
        config.width * AlignTool.getScaleScreenWidth(this.m_scene),
        config.height * AlignTool.getScaleScreenWidth(this.m_scene)
      );

    if (config.color) {
      image?.setTint(config.color);
    }

    image?.setDepth(this.m_depth);

    const extraImages: Array<Phaser.GameObjects.Image> = [];
    let extraData;
    if (config.animType !== undefined) {
      switch (config.animType as ANIMATION_TYPE) {
        case ANIMATION_TYPE.EASE_IN: {
          extraData = AnimationHelper.EaseInAndFade(
            this.m_scene,
            image,
            config.duration
          );
          break;
        }

        case ANIMATION_TYPE.FLASH_AND_RESIZE: {
          extraData = AnimationHelper.FlashAndResize(
            this.m_scene,
            image as Phaser.GameObjects.Image,
            config.duration,
            0xf5f3ce,
            { x: image.scaleX * 1.5, y: image.scaleY * 1.5 },
            { x: image.scaleX * 1, y: image.scaleY * 1 }
          );
          extraImages.push(extraData.flashData.flashObject);
          break;
        }

        case ANIMATION_TYPE.EMBIGGEN: {
          extraData = AnimationHelper.Resize2(
            this.m_scene,
            image,
            config.duration,
            { x: image.scaleX * 0.5, y: image.scaleY * 0.5 },
            { x: image.scaleX * 1.0, y: image.scaleY * 1.0 }
          );
          break;
        }

        case ANIMATION_TYPE.FLOAT_IN_FADE: {
          extraData = AnimationHelper.FloatInAndFade(
            this.m_scene,
            image as Phaser.GameObjects.Image,
            config.duration,
            { x: image.scaleX * 1.0, y: image.scaleY * 1.0 },
            { x: image.scaleX * 1.2, y: image.scaleY * 1.2 }
          );
          break;
        }
      }
    }

    // Timer setup
    if (!config.retain) {
      this.m_scene.time.delayedCall(config.duration * 1000 + 1000, () => {
        image?.setActive(false).setVisible(false);
        this.m_imagePool.push(image as Phaser.GameObjects.Image);
        extraImages.forEach((extraImage: Phaser.GameObjects.Image) => {
          extraImage.setActive(false).setVisible(false);
          this.m_imagePool.push(extraImage);
        });
      });
    }

    return { image, extraData };
  }

  clear() {
    this.m_imagePool.length = 0;
  }
}

export const ImagePopUp = ImagePopUpHelper.Instance;
