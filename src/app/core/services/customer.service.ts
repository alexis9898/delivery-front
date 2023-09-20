import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = `${environment.baseApiUrl}/api/customer`;
  customers$ = new BehaviorSubject<Customer[]>([]);
  constructor(private http: HttpClient,) { }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.url}`).pipe(tap(customers => {
      this.customers$.next(customers)
    }))
  }
}
