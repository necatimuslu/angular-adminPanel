import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { CrateCategory } from '../models/createCategory';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api:string = `${environment.apiUrl}/category`;
  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.api);
  }

  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(`${this.api}/${id}`);
  }
  createCategory(category:CrateCategory):Observable<Category>{
    return this.http.post<Category>(this.api, category);
  }
  updateCategory(id:string,category:Category):Observable<Category>{
    return this.http.put<Category>(`${this.api}/${id}`,category);
  }
  deleteCategory(id:string):Observable<{}>{
    return this.http.delete<{}>(`${this.api}/${id}`);
  }
}
