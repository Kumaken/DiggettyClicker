import 'phaser';
import { config, PhaserConfig } from './Config/PhaserConfig';
import registerScenes from './registerScenes';
import SceneKeys from './Config/SceneKeys';
require('./Style/config.scss');

let game: PhaserGame;

export class PhaserGame extends Phaser.Game {
  constructor(config: PhaserConfig) {
    super(config);
  }
}
window.onload = () => {
  game = new PhaserGame(config);
  registerScenes(game);
  game.scene.start(SceneKeys.Preload);
};

export function getGame() {
  return game;
}
