import { EnhancementType } from "./Enhancement";

export class Action {
  type: ActionType;
  value: number | string;
  valueObject: object | undefined;
  valueType: ActionValueType;
  subActions: Action[];
  small: boolean;
  hidden: boolean;
  enhancementTypes: EnhancementType[] | undefined;

  constructor(type: ActionType,
    value: number | string = "",
    valueType: ActionValueType = ActionValueType.fixed,
    subActions: Action[] = [],
    small: boolean = false,
    hidden: boolean = false) {
    this.type = type;
    this.value = value;
    this.valueType = valueType;
    this.subActions = subActions || [];
    this.small = small;
    this.hidden = hidden;
  }
}

export enum ActionType {
  area = "area",
  attack = "attack",
  card = "card",
  condition = "condition",
  custom = "custom",
  damage = "damage",
  element = "element",
  elementHalf = "elementHalf",
  fly = "fly",
  heal = "heal",
  grant = "grant",
  jump = "jump",
  loot = "loot",
  monsterType = "monsterType",
  move = "move",
  pierce = "pierce",
  pull = "pull",
  push = "push",
  range = "range",
  retaliate = "retaliate",
  shield = "shield",
  spawn = "spawn",
  special = "special",
  specialTarget = "specialTarget",
  sufferDamage = "sufferDamage",
  summon = "summon",
  swing = "swing",
  switchType = "switchType",
  target = "target",
  teleport = "teleport",
  nonCalc = "nonCalc",
  trigger = "trigger",
  concatenation = "concatenation",
  grid = "grid",
  box = "box",
  boxFhSubActions = "boxFhSubActions",
  forceBox = "forceBox",
}

export enum ActionValueType {
  plus = "plus",
  minus = "minus",
  add = "add",
  subtract = "subtract",
  fixed = "fixed"
}

export enum ActionSpecialTarget {
  all = "all",
  allies = "allies",
  alliesAdjacent = "alliesAdjacent",
  alliesAdjacentAffect = "alliesAdjacentAffect",
  alliesAffect = "alliesAffect",
  alliesRange = "alliesRange",
  alliesRangeAffect = "alliesRangeAffect",
  ally = "ally",
  allyAdjacent = "allyAdjacent",
  allyAffect = "allyAffect",
  allyAffectRange = "allyAffectRange",
  allyShort = "allyShort",
  enemies = "enemies",
  enemiesAdjacent = "enemiesAdjacent",
  enemiesMovedThrough = "enemiesMovedThrough",
  enemiesMovedThroughAdjacent = "enemiesMovedThroughAdjacent",
  enemiesRange = "enemiesRange",
  enemiesRangeAffect = "enemiesRangeAffect",
  enemiesRangeAffectExact = "enemiesRangeAffectExact",
  enemiesRangeExact = "enemiesRangeExact",
  enemy = "enemy",
  enemyAdjacent = "enemyAdjacent",
  enemyAllyRange = "enemyAllyRange",
  enemyOneAll = "enemyOneAll",
  enemyRange = "enemyRange",
  figures = "figures",
  figuresAdjacent = "figuresAdjacent",
  figuresRange = "figuresRange",
  focusEnemyFarthest = "focusEnemyFarthest",
  self = "self",
  selfAllies = "selfAllies",
  selfAlliesAdjacentAffect = "selfAlliesAdjacentAffect",
  selfAlliesAffect = "selfAlliesAffect",
  selfAlliesRange = "selfAlliesRange",
  selfOrAlly = "selfOrAlly",
  targets = "targets"
}

export enum ActionCardType {

  experience = "experience",
  lost = "lost",
  persistent = "persistent",
  recover = "recover",
  refresh = "refresh",
  round = "round",
  slot = "slot",
  slotXp = "slotXp"

}

export class ActionHint {
  type: ActionType;
  value: number;
  range: number;
  additionalRange: "add" | "substract" | false = false;

  constructor(type: ActionType,
    value: number,
    range: number = 0) {
    this.type = type;
    this.value = value;
    this.range = range;
  }
};