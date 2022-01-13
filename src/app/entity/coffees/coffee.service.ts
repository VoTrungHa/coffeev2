import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { PRODUCT } from './coffee.model';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  constructor(private http: HttpClient) {}
  optionHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  getProduct(): Observable<PRODUCT[]> {
    return this.http.get<PRODUCT[]>('api/products').pipe(
      tap((_) => console.log('fetched products')),
      catchError(this.handleError<PRODUCT[]>('getProducts', []))
    );
  }

  deleteProduct(id: number): Observable<PRODUCT> {
    return this.http
      .delete<PRODUCT>(`api/products/` + id, this.optionHeader)
      .pipe(
        tap((_) => console.log(`deleted product id=${id}`)),
        catchError(this.handleError<PRODUCT>('deleteProducys'))
      );
  }
  updateProduct(product: PRODUCT): Observable<PRODUCT[]> {
    return this.http
      .put<PRODUCT[]>('api/products', product, this.optionHeader)
      .pipe(
        tap((_) => console.log(`updated product id=${product.id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }

  getProductById(id: string): Observable<PRODUCT> {
    return this.http.get<PRODUCT>('api/products/' + id).pipe(
      tap((_) => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<PRODUCT>(`getProduct id=${id}`))
    );
  }

  addProduct(product: PRODUCT): Observable<PRODUCT> {
    return this.http
      .post<PRODUCT>('api/products', product, this.optionHeader)
      .pipe(
        tap((_) => console.log(`added product  `)),
        catchError(this.handleError<PRODUCT>('addProduct'))
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
