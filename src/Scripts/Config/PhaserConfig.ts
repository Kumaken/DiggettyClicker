export type PhaserConfig = Phaser.Types.Core.GameConfig;

// import LevelScene from '../Scene/LevelScene';
import PreloadScene from '../Scene/PreloadScene';
import TitleScene from '../Scene/TitleScene';
import LevelScene from '../Scene/LevelScene';

import { getResolution } from '../Util/Util';

export const config: PhaserConfig = {
  title: 'PhaserGame',
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-app',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: getResolution().width,
    height: getResolution().height
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: '#493a52'
};
