import {Component, OnInit} from '@angular/core';
import {BreakingBadService} from "../../services/breaking-bad.service";
import {Character} from "./character";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {

  characters: Character[];
  loading: boolean = true;

  constructor(private breakingBadService: BreakingBadService) {
    this.characters = [];
  }

  ngOnInit(): void {
    this.breakingBadService.getCharacters()
      .subscribe(res => {
        this.characters = res;
        this.loading = false;
      });
  }
}
