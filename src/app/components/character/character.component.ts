import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../characters/character";
import {NbComponentOrCustomStatus} from "@nebular/theme/components/component-status";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
})
export class CharacterComponent implements OnInit {

  @Input() character!: Character;

  constructor() {
  }

  ngOnInit(): void {
  }

  getStatus(status: string): NbComponentOrCustomStatus {
    switch (status) {
      case 'Alive':
        return 'success';
      case 'Deceased':
        return 'danger';
      case 'Presumed dead':
        return 'warning';
      default:
        return 'basic'
    }
  }
}
