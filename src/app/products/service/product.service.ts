import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllProducts(page = 0,  key = ''): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('pagination', 'true');
    params = params.append('key', key.toString());


    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/products`, {
      params,
      headers,
      observe: 'response'
    });
  }
  getProduct(Id): Observable<any> {
    let headers = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(`${this.apiUrl}/products/${Id}`, {
      headers,
      observe: 'response'
    });
  }
  getProductCategory(Id): Observable<any> {
    let headers = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(`${this.apiUrl}/categories/${Id}/products`, {
      headers,
      observe: 'response'
    });
  }
  addProduct(body) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    return this.http.post<any>(`${this.apiUrl}/products`, body, {
      headers,
      observe: 'response'
    });
  }
  updateProduct(body, id) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put(`${this.apiUrl}/products/${id}`, body, {
      headers,
      observe: 'response'
    });
  }
}
