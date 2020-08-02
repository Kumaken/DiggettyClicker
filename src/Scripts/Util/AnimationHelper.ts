/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Phaser from 'phaser';

type ObjectTransform = Phaser.GameObjects.GameObject &
  Phaser.GameObjects.Components.Transform;

export default class AnimationHelper {
  /**
   * Give pulsating animation to an object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param scale the target scale
   * @param repeatTime how many times the animation should play
   * @param delay the delay befor the animation start
   * @returns Tween
   */
  static Pulse(
    scene: Phaser.Scene,
    object: { scale: number; [prop: string]: any },
    duration: number,
    scale: number,
    repeatTime = 0,
    delay = 0
  ) {
    const tween = this.getTween(
      scene,
      object,
      {
        targets: object,
        scale: object.scale * scale,
        ease: 'Linear',
        duration: duration * 1000,
        yoyo: true,
        repeat: repeatTime,
        delay: delay * 1000
      },
      'pulse'
    );

    if (tween.hasStarted) {
      tween.stop(0);
      tween.restart();
    }

    return tween;
  }

  /**
   * Resize the object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param startScale the starting scale of the object
   * @param targetScale the target scale of the resize
   * @param delay the delay befor the animation start
   * @returns Tween
   */

  static Resize(
    scene: Phaser.Scene,
    object: any,
    duration: number,
    startScale: number,
    targetScale: number,
    delay = 0,
    yoyo = false
  ) {
    object.setScale(object.scale * startScale);

    const tween = this.getTween(
      scene,
      object,
      {
        targets: object,
        scale: object.scale * targetScale,
        ease: 'Linear',
        duration: duration * 1000,
        yoyo,
        repeat: 0,
        delay: delay * 1000
      },
      'resize'
    );

    if (tween.hasStarted) {
      tween.stop(0);
      tween.restart();
    }

    return tween;
  }

  /**
   * Resize the object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param startScale the starting scale of the object
   * @param targetScale the target scale of the resize
   * @param delay the delay befor the animation start
   * @returns Tween
   */
  static Resize2(
    scene: Phaser.Scene,
    object: any,
    duration: number,
    startScale: { x: number; y: number },
    targetScale: { x: number; y: number },
    delay = 0,
    ease = 'Linear'
  ) {
    object.setScale(startScale.x, startScale.y);

    const tween = this.getTween(
      scene,
      object,
      {
        targets: object,
        scaleX: targetScale.x,
        scaleY: targetScale.y,
        ease,
        duration: duration * 1000,
        yoyo: false,
        repeat: 0,
        delay: delay * 1000
      },
      'resize2'
    );

    if (tween.hasStarted) {
      // scaleX
      tween.data[0].start = tween.data[0].current;
      tween.data[0].end = targetScale.x;

      // scaleY
      tween.data[1].start = tween.data[1].current;
      tween.data[1].end = targetScale.y;

      tween.duration = duration;
      tween.startDelay = delay;

      tween.restart();
    }

    return tween;
  }

  /**
   * Resize the object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param startAngle the starting angle of the object
   * @param targetAngle the target angle of the resize
   * @param delay the delay befor the animation start
   * @param yoyo boolean = false
   * @returns Tween
   */
  static Rotate(
    scene: Phaser.Scene,
    object: any,
    duration: number,
    startAngle: number,
    targetAngle: number,
    delay = 0,
    yoyo = false
  ) {
    object.angle = startAngle;

    const tween = this.getTween(
      scene,
      object,
      {
        targets: object,
        angle: targetAngle,
        ease: 'Linear',
        duration: duration * 1000,
        yoyo,
        repeat: 0,
        delay: delay * 1000
      },
      'resize'
    );

    if (tween.hasStarted) {
      tween.stop(0);
      tween.restart();
    }

    return tween;
  }

  /**
   * Give swinging animation to object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param angle the angle of the swing
   * @param repeatTime how many times the animation should play
   * @returns Tween
   */
  static Swing(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.GameObject,
    duration: number,
    angle: number,
    repeatTime = 0
  ) {
    const tween = this.getTween(
      scene,
      object,
      {
        targets: object,
        angle,
        ease: 'Linear',
        duration: (duration / 2) * 1000,
        yoyo: true,
        repeat: 0,
        onComplete: () => {
          this.Swing(scene, object, duration, -angle, repeatTime - 1);
        }
      },
      `swing${repeatTime}`
    );

    if (tween.hasStarted) {
      tween.stop(0);
      tween.restart();
    }

    if (repeatTime > 0) {
      const keys: string[] = [];
      for (let i = 0; i < repeatTime; i++) {
        keys.push(`swing${i}`);
      }
      scene.tweens.getTweensOf(object).forEach((v) => {
        // @ts-ignore
        if (keys.includes(v.key)) {
          v.pause();
        }
      });
    }

    return tween;
  }

  /**
   * Give swinging animation to object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param alpha the target alpha
   * @param yoyo does the animation reverse on completion?
   * @param delay the delay before animation start
   * @param startAlpha the starting alpha
   * @param repeat does the animation repeat?
   * @returns Tween
   */
  static ChangeAlpha(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.GameObject,
    duration: number,
    alpha: number,
    yoyo = false,
    delay = 0,
    startAlpha = 1,
    repeat = 0
  ) {
    const tween = this.getTween(
      scene,
      object,
      {
        delay: delay * 1000,
        targets: object,
        alpha: { from: startAlpha, to: alpha },
        ease: 'Linear',
        duration: duration * 1000,
        yoyo,
        repeat
      },
      'change-alpha'
    );

    if (tween.hasStarted) {
      tween.data[0].start = startAlpha;
      tween.data[0].end = alpha;

      tween.duration = duration;
      tween.startDelay = delay;

      tween.restart();
    }

    return tween;
  }

  static color(
    scene: Phaser.Scene,
    object:
      | Phaser.GameObjects.Image
      | Phaser.GameObjects.Sprite
      | Phaser.Physics.Arcade.Sprite
      | Phaser.Physics.Arcade.Image
      | Phaser.GameObjects.Text,
    duration: number,
    color: number,
    yoyo = false,
    delay = 0
  ) {
    const c1 = Phaser.Display.Color.HexStringToColor('#ffffff');
    const c2 = Phaser.Display.Color.IntegerToColor(color);

    const tweenStep = 0;
    const tween = this.getTween(
      scene,
      object,
      {
        delay: delay * 1000,
        targets: object,
        ease: 'Linear',
        duration: duration * 1000,
        yoyo,
        repeat: 0,
        tweenStep: 100,
        onUpdate: () => {
          const col = Phaser.Display.Color.Interpolate.ColorWithColor(
            c1,
            c2,
            100,
            tweenStep
          );
          const colourInt = Phaser.Display.Color.GetColor(col.r, col.g, col.b);
          object.setTint(colourInt);
        }
      },
      'tint-color'
    );

    if (tween.hasStarted) {
      tween.data[0].start = 1;
      tween.data[0].end = color;

      tween.duration = duration;
      tween.startDelay = delay;
      tween.restart();
    }

    return tween;
  }

  /**
   * Give swinging animation to object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param target the target position
   * @returns Tween
   */
  static MoveToTarget(
    scene: Phaser.Scene,
    object: any,
    duration: number,
    target: Phaser.Math.Vector2,
    ease = 'Linear'
  ) {
    const step = new Phaser.Math.Vector2(
      target.x - object.x,
      target.y - object.y
    );

    const tween = this.getTween(
      scene,
      object,
      {
        targets: object,
        x: object.x + step.x,
        y: object.y + step.y,
        ease: 'Linear',
        duration: duration * 1000,
        yoyo: false,
        repeat: 0
      },
      'move-to-target'
    );

    if (tween.hasStarted) {
      tween.stop(0);
      tween.restart();
    }

    return tween;
  }

  /**
   * Give swinging animation to object
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @param target the target position
   * @returns Tween
   */
  static MoveToTargetContinuous(
    scene: Phaser.Scene,
    object: any,
    duration: number,
    target: Phaser.Math.Vector2,
    ease = 'Linear',
    repeat = -1
  ) {
    const step = new Phaser.Math.Vector2(
      target.x - object.x,
      target.y - object.y
    );

    const tween = this.getTween(
      scene,
      object,
      {
        targets: object,
        x: {
          duration: 1000 * duration,
          repeat,
          ease: 'linear',
          value: {
            getStart(target: Phaser.Math.Vector2, key: any, value: any) {
              return target.x;
            },
            getEnd(target: Phaser.Math.Vector2, key: any, value: any) {
              return target.x + step.x;
            }
          }
        },
        y: {
          duration: 1000 * duration,
          repeat,
          ease: 'linear',
          value: {
            getStart(target: Phaser.Math.Vector2, key: any, value: any) {
              return target.y;
            },
            getEnd(target: Phaser.Math.Vector2, key: any, value: any) {
              return target.y + step.y;
            }
          }
        },
        ease: 'Linear',
        duration: duration * 1000,
        yoyo: false,
        repeat: 0
      },
      'move-to-target'
    );

    if (tween.hasStarted) {
      tween.stop(0);
      tween.restart();
    }

    return tween;
  }

  /**
   * Give object ease in animation, object grows bigger and then dissipates
   * @param scene the current game scene
   * @param object object to animate
   * @param duration duration of the animation
   * @returns Tweens [Resize, ChangeAlpha]
   */
  static EaseInAndFade(scene: Phaser.Scene, object: any, duration: number) {
    const startScale = {
      x: object.scaleX * 0.3,
      y: object.scaleY * 0.3
    };

    const finalScale = {
      x: object.scaleX,
      y: object.scaleY
    };

    let easeDuration = duration * 0.5;

    if (easeDuration > 0.3) easeDuration = 0.5;

    return [
      this.Resize2(scene, object, easeDuration, startScale, finalScale),
      this.ChangeAlpha(scene, object, duration - easeDuration, 0, false, 0.5)
    ];
  }

  /**
   * Creates flash animation
   * @param scene
   * @param object Image to flash
   * @param duration Duration of flash
   */
  static Flash(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.Image,
    duration: number,
    color: number
  ) {
    const flashObject = scene.add
      .image(object.x, object.y, object.texture.key)
      .setTintFill(color)
      .setOrigin(object.originX, object.originY)
      .setDepth(object.depth);

    const tween = this.ChangeAlpha(scene, flashObject, 1, 0.1, false, 0, 1, 0);

    return {
      flashObject,
      tween
    };
  }

  /**
   * Creates flash and resize animation
   * @param scene Game scene where object is displayed
   * @param object Image to flash and resize
   * @param duration Duration of flash and resize
   * @param color Flash color
   * @param startScale Resize starting scale
   * @param targetScale Resize final scale
   */
  static FlashAndResize(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.Image,
    duration: number,
    color: number,
    startScale: { x: number; y: number },
    targetScale: { x: number; y: number }
  ) {
    const flashData = this.Flash(scene, object, duration, color);
    return {
      flashData,
      flashTween: this.Resize2(
        scene,
        flashData.flashObject,
        duration,
        startScale,
        targetScale
      ),
      objectTween: this.Resize2(
        scene,
        object,
        duration,
        startScale,
        targetScale
      )
    };
  }

  /**
   * Floats the image object up
   * @param scene
   * @param object
   * @param duration
   * @param color
   * @param startScale
   * @param targetScale
   */
  static FloatInAndFade(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.Image | Phaser.GameObjects.Text,
    duration: number,
    startScale: { x: number; y: number },
    targetScale: { x: number; y: number }
  ) {
    const floatTween = () =>
      this.MoveToTarget(
        scene,
        object,
        duration * 0.75,
        new Phaser.Math.Vector2(
          object.x,
          (object.y as number) - (object.height as number) / 10
        )
      );
    const alphaTween = () =>
      this.ChangeAlpha(scene, object, duration * 0.375, 0);
    const resizeTween = this.Resize2(
      scene,
      object,
      duration * 0.25,
      startScale,
      targetScale
    ).on('complete', () => {
      floatTween();
      scene.time.delayedCall(duration * 0.375 * 1000, alphaTween);
    });

    return { floatTween, alphaTween, resizeTween };
  }

  /**
   * Space wormhole
   * @param scene
   * @param object
   * @param duration
   * @param position Wormhole coordinate in 2d-plane x and y
   */
  static ZhoomZhoom(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.Image | Phaser.GameObjects.Text,
    duration: number,
    target: Phaser.Math.Vector2
  ) {
    const targetScale1 = {
      x: object.scaleX * 1.2,
      y: object.scaleY * 1.2
    };
    const targetScale2 = {
      x: object.scaleX * 0.2,
      y: object.scaleY * 0.2
    };

    const intermediaryPosition = {
      x: object.x,
      y: object.y + object.height / 10
    };

    const portion = {
      first: 0.6,
      second: 0.4
    };

    scene.add
      .tween({
        targets: object,
        scaleX: targetScale1.x,
        scaleY: targetScale1.y,
        duration: duration * portion.first * 1000
      })
      .on('complete', () => {
        scene.add.tween({
          targets: object,
          scaleX: targetScale2.x,
          scaleY: targetScale2.y,
          duration: duration * portion.second * 1000
        });
      });

    scene.add
      .tween({
        targets: object,
        x: intermediaryPosition.x,
        y: intermediaryPosition.y,
        duration: duration * portion.first * 1000
      })
      .on('complete', () => {
        scene.add.tween({
          targets: object,
          x: target.x,
          y: target.y,
          duration: duration * portion.second * 1000
        });
      });
  }

  /**
   * Reuse tween from scene
   * @param scene the current game scene
   * @param object object to animate
   * @param config tween config builder | object
   * @param key type of animation helper
   * @returns Tween
   */
  private static getTween(
    scene: Phaser.Scene,
    object: ObjectTransform | object,
    config: Phaser.Types.Tweens.TweenBuilderConfig | object,
    key: string
  ) {
    const tweens = scene.tweens.getTweensOf(object as object);
    let tween: Phaser.Tweens.Tween;
    if (!tweens.length) {
      tween = scene.add.tween(config);
    } else {
      for (let i = 0; i < tweens.length; i++) {
        // @ts-ignore
        if (tweens[i].key === key) {
          tween = tweens[i];
          break;
        }
      }
    }

    if (!tween!) {
      tween = scene.add.tween(config);
    }

    // @ts-ignore
    tween.key = key;

    return tween!;
  }
}
