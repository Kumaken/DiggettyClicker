import React from './jsx-dom-shim';
import { TabEntry } from './TabEntry';
import { UpgradeData } from '../Data/UpgradeData';

function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName('content-tab');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tab');
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' is-active', '');
  }
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' is-active';
}

const BottomTab = (upgradeListEl: any[]) =>
  (
    <div className="bottom-tab">
      <div className="tabs is-centered is-medium is-fullwidth is-toggle silk-screen-A is-size-5 is-marginless">
        <ul>
          <li className="tab is-active" onClick={() => openTab(event, '1')}>
            <a>Upgrades</a>
          </li>
          <li className="tab" onClick={() => openTab(event, '2')}>
            <a>Hiring</a>
          </li>
          <li className="tab" onClick={() => openTab(event, '3')}>
            <a>Marketing</a>
          </li>
          <li className="tab" onClick={() => openTab(event, '4')}>
            <a>Inventory</a>
          </li>
        </ul>
      </div>
      <div className="container section is-marginless is-paddingless">
        <div id="1" className="content-tab">
          {upgradeListEl}
        </div>
        <div id="2" className="content-tab" style="display:none">
          <p>WEBAUD</p>
        </div>
        <div id="3" className="content-tab" style="display:none">
          <p>SUPPORT</p>
        </div>
        <div id="4" className="content-tab" style="display:none">
          <p>SUPPORT</p>
        </div>
      </div>
    </div>
  ) as HTMLElement;

export default BottomTab;
