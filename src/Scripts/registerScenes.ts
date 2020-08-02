import SceneKeys from './Config/SceneKeys';

import TitleScene from './Scene/TitleScene';
import PreloadScene from './Scene/PreloadScene';
import LevelScene from './Scene/LevelScene';

const registerScenes = (game: Phaser.Game): void => {
  const scene = game.scene;
  scene.add(SceneKeys.Preload, PreloadScene);
  scene.add(SceneKeys.TitleScreen, TitleScene);
  scene.add(SceneKeys.Game, LevelScene);
};

export default registerScenes;
