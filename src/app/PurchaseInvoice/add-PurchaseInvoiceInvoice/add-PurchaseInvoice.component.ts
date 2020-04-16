import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NotificationService} from "../../shared/services/notification.service";
import {PurchaseInvoiceService} from "../service/PurchaseInvoice.service";
import {ProductService} from "../../products/service/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-PurchaseInvoice.component.html',
  styleUrls: ['./add-PurchaseInvoice.component.sass']
})
export class AddPurchaseInvoiceComponent implements OnInit, OnDestroy {
  PurchaseInvoiceForm: FormGroup;
  isUpdate = false;
  ProductData: any;
  $destroy = new Subject<any>();
  selectedProduct: string;
  products = [];
  SaleInvoiceArr = [];
  control: any

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private router: Router, private notificationService: NotificationService, private purchaseInvoiceService: PurchaseInvoiceService, private productService: ProductService) {
    // tslint:disable-next-line:max-line-length
    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data) {
      this.ProductData = this.router.getCurrentNavigation().extras.state.data;
      console.log(this.ProductData)
    }
  }

  ngOnInit() {
    this.PurchaseInvoiceForm = this.fb.group({
      dealerName: ['', [Validators.required]],
      invoice: this.fb.array([]),

    });
    this.inquireData();
  }

  AddInvoice() {
    this.control = (this.PurchaseInvoiceForm.controls.invoice as FormArray);
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
    return (this.PurchaseInvoiceForm.get('invoice') as FormArray).controls;
  }


  onSubmit() {
    for (const cont of this.control.controls) {
      // @ts-ignore
      cont.controls.total.setValue(cont.controls.qtn.value * cont.controls.price.value);
      console.log(cont.controls.total.value)
    }
    const data = {
      dealerName: this.PurchaseInvoiceForm.controls.dealerName.value
    };
    const PurchaseInvoiceData = this.PurchaseInvoiceForm.controls.invoice.value;
    this.purchaseInvoiceService.addPurchaseInvoice(data).subscribe(res => {
        this.purchaseInvoiceService.addPurchaseInvoiceRecords(PurchaseInvoiceData, res.body.id).subscribe(resp => {
        });
        this.notificationService.successNotification('تم الاضافة بنجاح');
        this.router.navigate(['../PurchaseInvoice/AllPurchaseInvoice'])
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
    this.PurchaseInvoiceForm.reset();
    this.router.navigate(['../PurchaseInvoice/AllPurchaseInvoice'])

  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
