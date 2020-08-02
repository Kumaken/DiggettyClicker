import * as Phaser from 'phaser';
import AnimationHelper from './AnimationHelper';
import AlignTool from './AlignTool';

export enum ANIMATION_TYPE {
  EASE_IN = 0,
  EMBIGGEN = 1,
  FLOAT_IN_FADE = 2,
  ZHOOM_ZHOOM = 3
}

type AnimationData = {
  position?: Phaser.Math.Vector2;
};

type TextStyle = {
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
  color: string;
  strokeThickness: number;
  stroke: string;
  shadow: {
    offsetX: number;
    offsetY: number;
    color: string;
    stroke: boolean;
  };
};

export interface TextConfig {
  x: number;
  y: number;
  text: string | Phaser.GameObjects.Text;
  duration: number;

  style?: Partial<TextStyle>;
  animType?: ANIMATION_TYPE;
  retain?: boolean;
  animData?: Partial<AnimationData>;
}

class TextPopUpHelper {
  private static instance: TextPopUpHelper;

  public static get Instance() {
    const instance = this.instance || (this.instance = new this());
    return instance;
  }

  private m_scene!: Phaser.Scene;

  private m_depth!: number;

  init(scene: Phaser.Scene, depth: number) {
    this.m_scene = scene;
    this.m_depth = depth;
  }

  /**
   * Create a text pop up for a certain duration
   * @param scene the current game scene (Phaser.Scene)
   * @param x  position x (number)
   * @param y position u (number)
   * @param text the text content (string)
   * @param duration the duration the text appear on screen in seconds (number)
   *
   * Optionals:
   * @param fontSize Size of the text
   * @param fontStyle Style of the text (e.g. 'bold')
   * @param fontFamily Text's font family
   * @param color Text color
   * @param strokeThickness Outline thickness
   * @param stroke Color of outline (must give strokeThickness to work)
   * @param shadow Gives shadow
   */
  showText(config: TextConfig) {
    if (!this.m_scene) {
      return undefined;
    }

    const scaleWidth = AlignTool.getScaleScreenWidth(this.m_scene);

    let text: Phaser.GameObjects.Text;

    if (typeof config.text === 'string') {
      const style = {
        ...config.style,
        ...{
          fontSize: `${(config.style?.fontSize as number) * scaleWidth}px`,
          strokeThickness:
            (config.style?.strokeThickness as number) * scaleWidth
        }
      };

      text = this.m_scene.add.text(config.x, config.y, config.text, style);
    } else {
      text = config.text;
    }

    text.setOrigin(0.5).setDepth(this.m_depth);

    let extraData;
    if (config.animType !== undefined) {
      switch (config.animType as ANIMATION_TYPE) {
        case ANIMATION_TYPE.EASE_IN: {
          extraData = AnimationHelper.EaseInAndFade(
            this.m_scene,
            text,
            config.duration
          );
          break;
        }

        case ANIMATION_TYPE.EMBIGGEN: {
          extraData = AnimationHelper.Resize2(
            this.m_scene,
            text,
            config.duration,
            { x: 0.5, y: 0.5 },
            { x: 1.0, y: 1.0 }
          );
          break;
        }

        case ANIMATION_TYPE.FLOAT_IN_FADE: {
          extraData = AnimationHelper.FloatInAndFade(
            this.m_scene,
            text,
            config.duration,
            { x: 1.1, y: 1.1 },
            { x: 1.0, y: 1.0 }
          );
          break;
        }

        case ANIMATION_TYPE.ZHOOM_ZHOOM: {
          AnimationHelper.ZhoomZhoom(
            this.m_scene,
            text,
            config.duration,
            config.animData?.position as Phaser.Math.Vector2
          );
          break;
        }
      }
    }

    if (!config.retain) {
      this.m_scene.time.delayedCall(config.duration * 1000, () => {
        text.setVisible(false);
      });
      this.m_scene.time.delayedCall((config.duration + 1) * 1000, () => {
        text.destroy();
      });
    }

    return { text, extraData };
  }
}

export const TextPopUp = TextPopUpHelper.Instance;
