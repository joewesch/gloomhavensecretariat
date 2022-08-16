export class Settings {
  calculate: boolean = true;
  calculateStats: boolean = true;
  abilityNumbers: boolean = true;
  eliteFirst: boolean = true;
  expireConditions: boolean = true;
  applyConditions: boolean = true;
  moveElements: boolean = true;
  hideStats: boolean = true;
  randomStandees: boolean = false;
  initiativeRequired: boolean = true;
  levelCalculation: boolean = true;
  levelAdjustment: number = 0;
  ge5Player: boolean = true;
  disableStandees: boolean = false;
  fullscreen: boolean = false;
  autoscroll: boolean = true;
  disableColumns: boolean = false;
  dragInitiative: boolean = true;
  dragHealth: boolean = true;
  hints: boolean = true;
  zoom: number = 100;
  barSize: number = 1;
  locale: string = "en";
  editionDataUrls: string[] = [];
  excludeEditionDataUrls: string[] = [];
  spoilers: string[] = [];
  browserNavigation: boolean = false;
  serverUrl: string | undefined;
  serverPort: number | undefined;
  serverPassword: string | undefined;
  serverAutoconnect: boolean = true;
  serverSettings: boolean = false;
  serverWss: boolean = false;
  maxUndo: number = 50;
}