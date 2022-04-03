import {BreakingBadService} from "../breaking-bad.service";
import {concatMap, forkJoin, map, Observable, of} from "rxjs";
import {Character, DeathInfo, KillInfo, Quote} from "../../components/characters/character";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NbToastrService} from "@nebular/theme";
import {BreakingBadApiService} from "./breaking-bad-api.service";

@Injectable({
  providedIn: "root"
})
export class BreakingBadCacheService implements BreakingBadService {

  constructor(private http: HttpClient,
              private toasterService: NbToastrService,
              private breakingBadApiService: BreakingBadApiService) {
  }

  getCharacters(): Observable<Character[]> {
    let charactersTxt = localStorage.getItem('characters');
    if (charactersTxt == null) {
      return this.breakingBadApiService.getCharacters();
    } else {
      try {
        return of(JSON.parse(charactersTxt));
      } catch (e) {
        localStorage.clear();
        return this.breakingBadApiService.getCharacters();
      }
    }
  }

  loadCharacterDetails(characters: Character[] = []): Observable<Character> {
    return of(...characters)
      .pipe(
        concatMap(character =>
          forkJoin([of(character), this.getDeathInfo(character), this.getKillInfo(character), this.getQuotes(character)])
        ),
        map(res => {
          const mappedCharacter = res[0];
          res[1] && (mappedCharacter.death = res[1]);
          mappedCharacter.kills = res[2];
          mappedCharacter.quotes = res[3];
          mappedCharacter.loaded = true;
          return mappedCharacter;
        })
      );
  }

  public getDeathInfo(character: Character): Observable<DeathInfo> {
    const key = 'characters-death-' + character.char_id;
    const localDeathInfo = localStorage.getItem(key);
    if (localDeathInfo) {
      try {
        return of(JSON.parse(localDeathInfo));
      } catch (e) {
        return this.breakingBadApiService.getDeathInfo(character);
      }
    } else {
      return this.breakingBadApiService.getDeathInfo(character);
    }
  }

  public getKillInfo(character: Character): Observable<KillInfo> {
    const key = 'characters-kill-' + character.char_id;
    const killInfo = localStorage.getItem(key);
    if (killInfo) {
      try {
        return of(JSON.parse(killInfo));
      } catch (e) {
        return this.breakingBadApiService.getKillInfo(character);
      }
    } else {
      return this.breakingBadApiService.getKillInfo(character);
    }
  }

  public getQuotes(character: Character): Observable<Quote[]> {
    const key = 'characters-quotes-' + character.char_id;
    const quotes = localStorage.getItem(key);
    if (quotes) {
      try {
        return of(JSON.parse(quotes));
      } catch (e) {
        return this.breakingBadApiService.getQuotes(character);
      }
    } else {
      return this.breakingBadApiService.getQuotes(character);
    }
  }
}
