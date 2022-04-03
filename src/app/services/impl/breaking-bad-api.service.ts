import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character, DeathInfo, KillInfo, Quote} from "../../components/characters/character";
import {catchError, concatMap, forkJoin, map, Observable, of, retry, tap, throwError} from "rxjs";
import {NbToastrService} from "@nebular/theme";
import {BreakingBadService} from "../breaking-bad.service";

@Injectable({
  providedIn: 'root'
})
export class BreakingBadApiService implements BreakingBadService {

  private API_BASE_URL: string = 'https://www.breakingbadapi.com/api';

  constructor(private http: HttpClient,
              private toasterService: NbToastrService) {
  }

  public getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.API_BASE_URL + '/characters')
      .pipe(
        tap(res => localStorage.setItem('characters', JSON.stringify(res))),
        retry(2),
        catchError(this.handleError)
      );
  }

  public getDeathInfo(character: Character): Observable<DeathInfo> {
    const key = 'characters-death-' + character.char_id;
    return this.http.get<any>(this.API_BASE_URL + '/death', {
      params: {
        name: character.name
      }
    }).pipe(
      map(res => (res.length > 0) ? res[0] : {}),
      tap(res => {
        localStorage.setItem(key, JSON.stringify(res));
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  public getKillInfo(character: Character): Observable<KillInfo> {
    const key = 'characters-kill-' + character.char_id;
    return this.http.get<any>(this.API_BASE_URL + '/death-count', {
      params: {
        name: character.name
      }
    }).pipe(
      map(res => (res.length > 0) ? res[0] : {}),
      tap(res => {
        localStorage.setItem(key, JSON.stringify(res));
      }),
      retry(2),
      catchError(this.handleError)
    );
  }


  public getQuotes(character: Character): Observable<Quote[]> {
    const key = 'characters-quotes-' + character.char_id;
    return this.http.get<Quote[]>(this.API_BASE_URL + '/quote', {
      params: {
        author: character.name
      }
    }).pipe(
      tap(res => {
        localStorage.setItem(key, JSON.stringify(res));
      }),
      retry(2),
      catchError(this.handleError)
    );
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
        }),
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.toasterService.danger('something went wrong', errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
