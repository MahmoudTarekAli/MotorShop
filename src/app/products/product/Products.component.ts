import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductService} from "../service/product.service";
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";
import {fromEvent, Subject} from "rxjs";
import {Router} from "@angular/router";
import {ProductsDataSource} from "./classes/products.data.source";

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [
    'name',
    'code',
    'location',
    'category',
    'discount',
    'purchasingPrice',
    'sellingPrice',
    'priceWithTax',
    'actions'
  ];
  dataSource = new ProductsDataSource(this.categoriesService);
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
    public categoriesService: ProductService,
    private snackBar: MatSnackBar
  ) {
  }


  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.dataSource = new ProductsDataSource(this.categoriesService);
    this.dataSource.loadProducts(0, this.filter.nativeElement.value);
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
    this.dataSource.loadProducts(
      this.paginator.pageIndex,
      this.filter.nativeElement.value,
    );
  }
  UpdateCategory(element) {
    this.router.navigate(['../products/update-product', element.id], {state: {data: element}})
  }

   ngOnDestroy() {
       this.$destroy.next();
       this.$destroy.complete();
     }
}
