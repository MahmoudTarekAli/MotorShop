import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CategoriesDataSource} from "./classes/categories.data.source";
import {CategoriesService} from "../service/categories.service";
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";
import {fromEvent, Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-allCategories',
  templateUrl: './allCategories.component.html',
  styleUrls: ['./allCategories.component.scss']
})
export class AllCategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [
    'name',
    'actions'
  ];
  dataSource = new CategoriesDataSource(this.categoriesService);
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
    public categoriesService: CategoriesService,
    private snackBar: MatSnackBar
  ) {
  }


  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.dataSource = new CategoriesDataSource(this.categoriesService);
    this.dataSource.loadCategories(0, this.filter.nativeElement.value);
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
    this.dataSource.loadCategories(
      this.paginator.pageIndex,
      this.filter.nativeElement.value,
    );
  }
  UpdateCategory(element) {
    this.router.navigate(['../categories/update-category', element.id], {state: {data: element}})
  }

   ngOnDestroy() {
       this.$destroy.next();
       this.$destroy.complete();
     }
}
