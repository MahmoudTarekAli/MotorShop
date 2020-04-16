import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {fromEvent, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllSalesInvoices(page = 0, key = ''): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('pagination', 'true');
    params = params.append('key', key.toString());
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/salesInvoices`, {
      params,
      headers,
      observe: 'response'
    });
  }
  addSaleInvoice(body) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    return this.http.post<any>(`${this.apiUrl}/salesInvoices`, body, {
      headers,
      observe: 'response'
    });
  }
  addSaleInvoiceRecords(body, id) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    return this.http.post<any>(`${this.apiUrl}/salesInvoices/${id}/salesInvoiceRecords`, body, {
      headers,
      observe: 'response'
    });
  }
  deleteInvoice(Id) {
    return this.http.delete(`${this.apiUrl}/salesInvoices/${Id}`, {
      observe: 'response'
    });
  }
}
