import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NotificationService} from "../../shared/services/notification.service";
import {CategoriesService} from "../../categories/service/categories.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit, OnDestroy {
  ProductForm: FormGroup;
  isUpdate = false;
  ProductData: any;
  $destroy = new Subject<any>();
  selectedCategory: string;
  categories = [];

  // tslint:disable-next-line:max-line-length
  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private productService: ProductService, private router: Router, private notificationService: NotificationService, private categoryService: CategoriesService) {
    // tslint:disable-next-line:max-line-length
    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data) {
      this.ProductData = this.router.getCurrentNavigation().extras.state.data;
      console.log(this.ProductData)
    }
  }

  ngOnInit() {
    this.ProductForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      location: ['', [Validators.required]],
      category: ['', [Validators.required]],
      discount: [''],
      purchasingPrice: ['', [Validators.required]],
      sellingPrice: ['', [Validators.required]],
      priceWithTax: ['', [Validators.required]],
    });
    if (this.activeRoute.snapshot.params.id) {
      this.isUpdate = true;
      if (this.ProductData === undefined) {
        this.productService.getProduct(this.activeRoute.snapshot.params.id).subscribe(data => {
          this.ProductData = data.body.product;
          this.setCategoryValue();
        });
      } else {
        this.setCategoryValue();

      }
    } else {
      this.isUpdate = false;
    }
    this.inquireData();
  }

  setCategoryValue() {
    this.ProductForm.controls.name.setValue(this.ProductData.name);
    this.ProductForm.controls.code.setValue(this.ProductData.code);
    this.ProductForm.controls.location.setValue(this.ProductData.location);
    this.selectedCategory = this.ProductData.categoryId;
    this.ProductForm.controls.discount.setValue(this.ProductData.discount);
    this.ProductForm.controls.purchasingPrice.setValue(this.ProductData.purchasingPrice);
    this.ProductForm.controls.sellingPrice.setValue(this.ProductData.sellingPrice);
    this.ProductForm.controls.priceWithTax.setValue(this.ProductData.priceWithTax);
  }

  onSubmit() {
    const data = {
      name: this.ProductForm.controls.name.value,
      code: this.ProductForm.controls.code.value,
      location: this.ProductForm.controls.location.value,
      categoryId: this.selectedCategory,
      discount: this.ProductForm.controls.discount.value,
      purchasingPrice: this.ProductForm.controls.purchasingPrice.value,
      sellingPrice: this.ProductForm.controls.sellingPrice.value,
      priceWithTax: this.ProductForm.controls.priceWithTax.value,
    };
    console.log(data);
    if (this.isUpdate === false) {
      this.productService.addProduct(data).pipe(takeUntil(this.$destroy)).subscribe(res => {
          if (res.status === 200) {
            this.notificationService.successNotification('تم الاضافة بنجاح');
            this.router.navigate(['../products/AllProducts'])
          }
        }, error => {
          this.notificationService.errorNotification(error)
        }
      );
    } else {
      this.productService.updateProduct(data, this.ProductData.id).pipe(takeUntil(this.$destroy)).subscribe(res => {
        if (res.status === 200) {
          this.notificationService.successNotification('تم التعديل بنجاح');
          this.router.navigate(['../products/AllProducts'])
        }
      }, error => {
        this.notificationService.errorNotification(error)
      })
    }
  }


  inquireData() {
    this.categoryService.getAllCategories().pipe(takeUntil(this.$destroy)).subscribe(resp => {
      this.categories = resp.body.categories;
    })
  }

  cancel() {
    this.ProductForm.reset();
    this.router.navigate(['../products/AllProducts'])

  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
