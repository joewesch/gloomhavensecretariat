import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { GameManager, gameManager } from "src/app/game/businesslogic/GameManager";

import { Character } from "src/app/game/model/Character";
import { SummonData } from "src/app/game/model/data/SummonData";
import { Summon, SummonColor, SummonState } from "src/app/game/model/Summon";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ghs-character-summondialog',
  templateUrl: 'summondialog.html',
  styleUrls: ['./summondialog.scss']
})
export class CharacterSummonDialog {

  gameManager: GameManager = gameManager;
  summonColors: SummonColor[] = Object.values(SummonColor).filter((summonColor) => summonColor != SummonColor.custom && summonColor != SummonColor.fh);
  summonColor: SummonColor = SummonColor.blue;
  summonNumber: number = 1;
  summonName: string = "";
  summonFilter: string;
  fhSummon: boolean = false;

  constructor(@Inject(DIALOG_DATA) public character: Character, private dialogRef: DialogRef) {
    this.summonFilter = "";
    for (let i = 2; i < 9; i++) {
      if (this.summonData().filter((summonData) => this.available(summonData, i)) > this.summonData().filter((summonData) => this.available(summonData, i - 1))) {
        this.summonNumber = i;
      }
    }
    this.fhSummon = this.character.edition === 'fh' || gameManager.editionExtensions(this.character.edition).indexOf('fh') != -1;
    this.fhSummon = false; // TODO: improve FH summons marker
    if (this.fhSummon) {
      this.summonColor = SummonColor.fh;
    }
  }

  pickNumber(number: number) {
    this.summonNumber = number;
  }

  selectColor(color: SummonColor) {
    this.summonColor = color;
  }

  available(summonData: SummonData, number: number = this.summonNumber): boolean {
    return this.summonColor != SummonColor.custom && number != 0 && this.character.summons.every((summon) => summon.dead || summon.name != summonData.name || (summonData.special ? summon.number != 0 : summon.number != number) || (summonData.special ? summon.color != SummonColor.custom : summon.color != this.summonColor)) && (summonData.count || 1) > this.character.summons.filter((summon) => summon.name == summonData.name && summon.cardId == summonData.cardId && gameManager.entityManager.isAlive(summon)).length
  }

  customDisabled() {
    return this.character.summons.some((summon) => gameManager.entityManager.isAlive(summon) && summon.name == this.summonName && summon.number == this.summonNumber && summon.color == this.summonColor);
  }

  showLevel(summonData: SummonData): boolean {
    return this.summonData().some((other) => other.name == summonData.name && other.cardId != summonData.cardId);
  }

  summonData(): SummonData[] {
    let summons: SummonData[] = [];
    summons.push(...this.character.availableSummons.filter((summonData) => !summonData.level || summonData.level <= this.character.level));

    if (this.character.progress && this.character.progress.items) {
      for (let itemIdentifier of this.character.progress.items) {
        const item = gameManager.itemManager.getItem(+itemIdentifier.name, itemIdentifier.edition, true);
        if (item && item.summon) {
          if (!item.summon.name) {
            item.summon.name = item.name;
          }
          if (!item.summon.count) {
            item.summon.count = 1;
          }
          summons.push(item.summon);
        }
      }
    }

    return summons.filter((summonData) => !this.summonFilter || summonData.cardId == this.summonFilter);
  }

  setSummonName(event: any) {
    this.summonName = event.target.value;
  }

  addCustomSummon() {
    let summon: Summon = new Summon(uuidv4(), this.summonName, "", this.character.level, this.summonNumber, this.summonColor);
    summon.state = SummonState.new;
    gameManager.characterManager.addSummon(this.character, summon);
    this.dialogRef.close();
  }

  addSummon(summonData: SummonData) {
    if (this.summonData().indexOf(summonData) != -1) {
      gameManager.stateManager.before("addSummon", "data.character." + this.character.name, "data.summon." + summonData.name);
      let summon: Summon = new Summon(uuidv4(), summonData.name, summonData.cardId, this.character.level, summonData.special ? 0 : this.summonNumber, summonData.special ? SummonColor.custom : this.summonColor, summonData);
      if (summonData.special) {
        summon.state = SummonState.true;
      } else {
        summon.state = SummonState.new;
      }
      summon.init = false;
      gameManager.characterManager.addSummon(this.character, summon);
      if (!summonData.count || this.character.summons.filter((summon) => summon.name == summonData.name && summon.cardId == summonData.cardId).length == summonData.count) {
        this.dialogRef.close();
      } else {
        this.summonFilter = summonData.cardId;
        this.summonNumber++;
        if (this.summonNumber > 4) {
          this.summonNumber = 1;
        }
      }
      gameManager.stateManager.after();
    }
  }

}