import SceneKeys from './Config/SceneKeys';

import TitleScene from './Scene/TitleScene';
import PreloadScene from './Scene/PreloadScene';
import LevelScene from './Scene/LevelScene';
import GameUI from './Scene/GameUI';

const registerScenes = (game: Phaser.Game): void => {
  const scene = game.scene;
  scene.add(SceneKeys.Preload, PreloadScene);
  scene.add(SceneKeys.TitleScreen, TitleScene);
  scene.add(SceneKeys.Game, LevelScene);
  scene.add(SceneKeys.GameUI, GameUI);
};

export default registerScenes;
