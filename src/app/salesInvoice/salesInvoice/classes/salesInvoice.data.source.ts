import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {catchError, finalize, first, tap} from 'rxjs/operators';
import {SalesInvoiceService} from "../../service/salesInvoice.service";

export class SalesInvoiceDataSource implements DataSource<any> {

  private categories = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private metaSubject = new BehaviorSubject<any>({});
  public mata$ = this.metaSubject.asObservable();

  public loading$ = this.loadingSubject.asObservable();
  empty = false;

  constructor(private salesInvoiceService: SalesInvoiceService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.categories.pipe(
      tap(data => {
        this.empty = !data.length;
      })
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categories.complete();
    this.loadingSubject.complete();
  }

  loadSalesInvoice(pageNumber, $search) {

    this.loadingSubject.next(true);

    this.salesInvoiceService.getAllSalesInvoices(pageNumber, $search)
      .pipe(
        first(),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(data => {
        this.categories.next(data.body.salesInvoices);
        this.metaSubject.next(data.body.pagination.totalCount);



      });
  }
}
