import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Product } from '../models/product';
import { ProductDetail } from '../models/product-detail-delivery';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url = `${environment.baseApiUrl}/api/Customer`;
  customers$ = new BehaviorSubject<Customer[]>([]);
  constructor(private http: HttpClient,) { }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.url}`).pipe(tap(customers => {
      console.log('ggg');
      this.customers$.next(customers)
    }))
  }
}
