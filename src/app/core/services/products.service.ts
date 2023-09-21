import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Product } from '../models/product';
import { ProductDetail } from '../models/product-detail-delivery';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = `${environment.baseApiUrl}/api/product`;
  products$ = new BehaviorSubject<Product[]>([]);
  productsDetail$ = new BehaviorSubject<ProductDetail[]>([]);
  constructor(private http: HttpClient,) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}`).pipe(tap(products => {
      this.products$.next(products)
    }))
  }
}
