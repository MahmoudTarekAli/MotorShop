import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from "../service/categories.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  CategoryForm: FormGroup;
  isUpdate = false;
  CategoryData: any;
  $destroy = new Subject<any>();
  // tslint:disable-next-line:max-line-length
  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private categoriesService: CategoriesService, private router: Router, private notificationService: NotificationService) {
    // tslint:disable-next-line:max-line-length
    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data) {
      this.CategoryData = this.router.getCurrentNavigation().extras.state.data;
      console.log(this.CategoryData)
    }
  }
  ngOnInit() {
    this.CategoryForm = this.fb.group({
      name: ['', [Validators.required]],
    });
    if (this.activeRoute.snapshot.params.id) {
      this.isUpdate = true;
      if (this.CategoryData === undefined) {
        this.categoriesService.getCategory(this.activeRoute.snapshot.params.id).subscribe(data => {
          this.CategoryData = data.body.category;
          this.setCategoryValue();
        });
      } else {
        this.setCategoryValue();

      }
    } else {
      this.isUpdate = false;
    }
  }
  setCategoryValue() {
    this.CategoryForm.controls.name.setValue(this.CategoryData.name);
  }
  onSubmit() {
    const data = {
      name: this.CategoryForm.controls.name.value
    };
    if (this.isUpdate === false) {
      this.categoriesService.addCategory(data).pipe(takeUntil(this.$destroy)).subscribe(res => {
          if (res.status === 200) {
            this.notificationService.successNotification('تم الاضافة بنجاح');
            this.router.navigate(['../categories/AllCategories'])
          }
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.categoriesService.updateCategory(data, this.CategoryData.id).pipe(takeUntil(this.$destroy)).subscribe(res => {
        if (res.status === 200) {
          this.notificationService.successNotification('تم التعديل بنجاح');
          this.router.navigate(['../categories/AllCategories'])
        }
      }, error => {
        console.log(error);
      })
    }
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
  cancel() {
    this.CategoryForm.reset();
    this.router.navigate(['../categories/AllCategories'])

  }
}
