import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";
import {fromEvent, Subject} from "rxjs";
import {Router} from "@angular/router";
import {PurchaseInvoiceDataSource} from "./classes/PurchaseInvoice.data.source";
import {PurchaseInvoiceService} from "../service/PurchaseInvoice.service";

@Component({
  selector: 'app-Products',
  templateUrl: './PurchaseInvoice.component.html',
  styleUrls: ['./PurchaseInvoice.component.scss']
})
export class PurchaseInvoiceComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [
    'customerName',
    'total',
    'dateCreated',
    'actions'
  ];
  dataSource = new PurchaseInvoiceDataSource(this.salesInvoiceService);
  index: number;
  id: number;
  $destroy = new Subject<any>();
  categories: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(
    public httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    public salesInvoiceService: PurchaseInvoiceService,
    private snackBar: MatSnackBar
  ) {
  }


  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.dataSource = new PurchaseInvoiceDataSource(this.salesInvoiceService);
    this.dataSource.loadSalesInvoice(0, this.filter.nativeElement.value);
    this.dataSource.mata$.pipe(
      takeUntil(this.$destroy)
    ).subscribe(totalNumber => this.categories = totalNumber);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadPage())).subscribe();
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
        }),
        takeUntil(this.$destroy)
      )
      .subscribe();
  }

  loadPage() {
    this.dataSource.loadSalesInvoice(
      this.paginator.pageIndex,
      this.filter.nativeElement.value,
    );
  }
  UpdateCategory(element) {
    this.router.navigate(['../saleInvoice/update-saleInvoice', element.id], {state: {data: element}})
  }

  deleteInvoice(id) {
    this.salesInvoiceService.deleteInvoice(id).pipe(takeUntil(this.$destroy)).subscribe(data => {
      this.loadPage()
    })
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
