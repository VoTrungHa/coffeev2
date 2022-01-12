import { Injectable } from '@angular/core';
import { ACCOUNT } from './account.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  optionHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAccounts(): Observable<ACCOUNT[]> {
    return this.http.get<ACCOUNT[]>('api/accounts').pipe(
      tap((_) => console.log('fetched heroes')),
      catchError(this.handleError<ACCOUNT[]>('getAccounts', []))
    );
  }

  addAccount(account: ACCOUNT): Observable<ACCOUNT> {
    return this.http
      .post<ACCOUNT>('api/accounts', account, this.optionHeader)
      .pipe(
        tap((_) => console.log(`added account  `)),
        catchError(this.handleError<ACCOUNT>('addAccount'))
      );
  }
  getAccountById(id: string): Observable<ACCOUNT> {
    return this.http.get<ACCOUNT>('api/accounts/' + id).pipe(
      tap((_) => console.log(`fetched account id=${id}`)),
      catchError(this.handleError<ACCOUNT>(`getAccount id=${id}`))
    );
  }

  updateAccount(account: ACCOUNT): Observable<ACCOUNT[]> {
    console.log(account);
    return this.http
      .put<ACCOUNT[]>('api/accounts', account, this.optionHeader)
      .pipe(
        tap((_) => console.log(`updated account id=${account.id}`)),
        catchError(this.handleError<any>('updateAccount'))
      );
  }

  deleteAccount(id: number): Observable<ACCOUNT> {
    return this.http
      .delete<ACCOUNT>(`api/accounts/` + id, this.optionHeader)
      .pipe(
        tap((_) => console.log(`deleted account id=${id}`)),
        catchError(this.handleError<ACCOUNT>('deleteAccount'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
