import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NotificationService} from "../../shared/services/notification.service";
import {SalesInvoiceService} from "../service/salesInvoice.service";
import {ProductService} from "../../products/service/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-salesInvoice.component.html',
  styleUrls: ['./add-salesInvoice.component.sass']
})
export class AddSalesInvoiceComponent implements OnInit, OnDestroy {
  SalesInvoiceForm: FormGroup;
  isUpdate = false;
  ProductData: any;
  $destroy = new Subject<any>();
  selectedProduct: string;
  products = [];
  SaleInvoiceArr = [];
  control: any

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private router: Router, private notificationService: NotificationService, private salesInvoiceService: SalesInvoiceService, private productService: ProductService) {
    // tslint:disable-next-line:max-line-length
    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data) {
      this.ProductData = this.router.getCurrentNavigation().extras.state.data;
      console.log(this.ProductData)
    }
  }

  ngOnInit() {
    this.SalesInvoiceForm = this.fb.group({
      customerName: ['', [Validators.required]],
      invoice: this.fb.array([]),
    });
    this.inquireData();
  }
  AddInvoice() {
    this.control = (this.SalesInvoiceForm.controls.invoice as FormArray);
    this.control.push(
      this.fb.group({
        productId: [''],
        qtn: [''],
        price: [''],
        total: [''],
      })
    );
  }
  getCrew() {
    return (this.SalesInvoiceForm.get('invoice') as FormArray).controls;
  }
  onSubmit() {
    for (const cont of this.control.controls) {
      cont.controls.total.setValue(cont.controls.qtn.value * cont.controls.price.value);
    }
    const data = {
      customerName: this.SalesInvoiceForm.controls.customerName.value
    };
    const SaleInvoiceData = this.SalesInvoiceForm.controls.invoice.value;
    this.salesInvoiceService.addSaleInvoice(data).subscribe(res => {
        this.salesInvoiceService.addSaleInvoiceRecords(SaleInvoiceData, res.body.id).subscribe(resp => {
        });
        this.notificationService.successNotification('تم الاضافة بنجاح');
        this.router.navigate(['../saleInvoice/AllSalesInvoice'])
      }, error => {
        this.notificationService.errorNotification(error)
      }
    );
  }
  inquireData() {
    this.productService.getAllProducts().pipe(takeUntil(this.$destroy)).subscribe(resp => {
      this.products = resp.body.products;
    })
  }
  cancel() {
    this.SalesInvoiceForm.reset();
    this.router.navigate(['../products/AllProducts'])

  }
  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
