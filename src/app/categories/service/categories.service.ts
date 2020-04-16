import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllCategories(page = 0,  key = ''): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('pagination', 'true');
    params = params.append('key', key.toString());


    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/categories`, {
      params,
      headers,
      observe: 'response'
    });
  }
  getCategory(Id): Observable<any> {
    let headers = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(`${this.apiUrl}/categories/${Id}`, {
      headers,
      observe: 'response'
    });
  }
  addCategory(body) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    return this.http.post<any>(`${this.apiUrl}/categories`, body, {
      headers,
      observe: 'response'
    });
  }
  updateCategory(body, id) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put(`${this.apiUrl}/categories/${id}`, body, {
      headers,
      observe: 'response'
    });
  }
}
