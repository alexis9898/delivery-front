import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = `${environment.baseApiUrl}/api/product`;
  products$ = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient,) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}`).pipe(tap(products => {
      this.products$.next(products)
    }))
  }
}
