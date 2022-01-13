import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  api:string = `${environment.apiUrl}/user`;
  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.api);
  }
  getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${this.api}/${id}`);
  }
  createUser(formData:FormData):Observable<User>{
    return this.http.post<User>(`${this.api}`,formData);
  }
  updateUser(id:string,formData:FormData):Observable<User>{
    return this.http.put<User>(`${this.api}/${id}`,formData);
  }
  deleteUser(id:string):Observable<{}>{
    return this.http.delete<{}>(`${this.api}/${id}`);
  }
}
