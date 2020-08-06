import { ITextureKey } from './ITextureKey';

export interface IUpgradeData {
  key: string;
  name: string;
  desc: string;
  baseCost: number;
  costUpRatio: number;
  baseDMG: number;
  dmgGrowthType: string;
  dmgUpRatio: number;
}
