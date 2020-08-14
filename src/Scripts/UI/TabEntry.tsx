import React from './jsx-dom-shim';
import './card.scss';
import { IUpgradeData } from '../Interfaces/IUpgradeData';
import GameEvents from '../Config/GameEvents';

const issueUpgradeLevelUp = (scene: Phaser.Scene, key: string) => {
  scene.events.emit(GameEvents.OnUpgradeIssued, key);
};

export const TabEntry = (
  key: string,
  upgradeData: IUpgradeData,
  cur_cost: number,
  scene: Phaser.Scene
) => (
  <div
    key={key}
    class="container is-marginless"
    onClick={() => issueUpgradeLevelUp(scene, key)}
  >
    <div class="card is-horizontal tab-entry">
      <div class="card-image align-both-center">
        <figure class="image is-64x64">
          <img
            src="https://p1.hiclipart.com/preview/38/630/500/minecraft-diamond-pickaxe-minecraft-diamond-axe-png-clipart.jpg"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-stacked">
        <div class="card-content is-paddingless">
          <div class="media-content">
            <p class="title is-4">{upgradeData.name}</p>
            <p class="subtitle is-6">{cur_cost}</p>
          </div>

          <div class="content">
            {upgradeData.desc} <a>@bulmaio</a>.<a href="#">#css</a>{' '}
            <a href="#">#responsive</a>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
);
