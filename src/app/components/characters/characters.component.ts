import {Component, OnInit} from '@angular/core';
import {Character} from "./character";
import {BreakingBadCacheService} from "../../services/impl/breaking-bad-cache.service";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {

  characters!: Character[];
  loading: boolean = true;

  constructor(private breakingBadService: BreakingBadCacheService) {
  }

  ngOnInit(): void {
    this.breakingBadService.getCharacters()
      .subscribe(res => {
        this.characters = res;
        this.loading = false;
        this.breakingBadService.loadCharacterDetails(res).subscribe();
        console.log(this.characters);
      });
  }
}
