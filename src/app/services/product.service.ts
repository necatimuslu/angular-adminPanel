import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api:string = `${environment.apiUrl}/product`;
  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.api);
  }
  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${this.api}/${id}`);
  }
  createProduct(formData:FormData):Observable<Product>{
    return this.http.post<Product>(`${this.api}`,formData);
  }
  updateProduct(id:string,formData:FormData):Observable<Product>{
    return this.http.put<Product>(`${this.api}/${id}`,formData);
  }
  deleteProduct(id:string):Observable<{}>{
    return this.http.delete<{}>(`${this.api}/${id}`);
  }
}
