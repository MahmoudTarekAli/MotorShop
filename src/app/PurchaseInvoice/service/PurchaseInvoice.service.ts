import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {fromEvent, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllPurchaseInvoice(page = 0, key = ''): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('pagination', 'true');
    params = params.append('key', key.toString());
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(`${this.apiUrl}/purchaseInvoices`, {
      params,
      headers,
      observe: 'response'
    });
  }
  addPurchaseInvoice(body) {
    return this.http.post<any>(`${this.apiUrl}/purchaseInvoices`, body, {
      observe: 'response'
    });
  }
  addPurchaseInvoiceRecords(body, id) {
    return this.http.post<any>(`${this.apiUrl}/purchaseInvoices/${id}/PurchaseInvoiceRecords`, body, {
      observe: 'response'
    });
  }
  deleteInvoice(Id) {
    return this.http.delete(`${this.apiUrl}/purchaseInvoices/${Id}`, {
      observe: 'response'
    });
  }
}
