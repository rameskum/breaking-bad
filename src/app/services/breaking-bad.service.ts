import {Observable} from "rxjs";
import {Character, DeathInfo, KillInfo, Quote} from "../components/characters/character";

export interface BreakingBadService {

  getCharacters(): Observable<Character[]>;

  getDeathInfo(character: Character): Observable<DeathInfo>;

  getKillInfo(character: Character): Observable<KillInfo>;

  getQuotes(character: Character): Observable<Quote[]>

  loadCharacterDetails(characters: Character[]): Observable<Character>;
}
