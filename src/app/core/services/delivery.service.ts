import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Delivery } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  url = `${environment.baseApiUrl}/api/delivery`;
  deliveries$ = new BehaviorSubject<Delivery[]>([]);
  constructor(private http: HttpClient,) { }

  getDeliveries() {
    return this.http.get<Delivery[]>(`${this.url}`).pipe(tap(deliveries => {
      this.deliveries$.next(deliveries);
    }))
  }
}
