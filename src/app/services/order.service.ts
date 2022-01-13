import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  api:string = `${environment.apiUrl}/order`;
  constructor(private http:HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.api);
  }
  getOrderById(id:string):Observable<Order>{
    return this.http.get<Order>(`${this.api}/${id}`);
  }
  createOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(`${this.api}`,order);
  }
  updateOrder(id:string,order:Order):Observable<Order>{
    return this.http.put<Order>(`${this.api}/${id}`,order);
  }
  deleteOrder(id:string):Observable<Order>{
    return this.http.delete<Order>(`${this.api}/${id}`);
  }
}
