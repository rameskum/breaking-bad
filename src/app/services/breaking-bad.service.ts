import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "../components/characters/character";
import {catchError, Observable, retry, throwError} from "rxjs";
import {NbToastrService} from "@nebular/theme";

@Injectable({
  providedIn: 'root'
})
export class BreakingBadService {

  private API_BASE_URL: string = 'https://www.breakingbadapi.com/api';

  constructor(private http: HttpClient,
              private toasterService: NbToastrService) {
  }

  public getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.API_BASE_URL + '/characters')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(error: any) {
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
