import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../shared/angular-material-elements/material.module";
import {PurchaseInvoiceRoutingModule} from "./PurchaseInvoice-routing.module";
import {PurchaseInvoiceComponent} from "./PurchaseInvoiceInvoice/PurchaseInvoice.component";
import {AddPurchaseInvoiceComponent} from "./add-PurchaseInvoiceInvoice/add-PurchaseInvoice.component";
@NgModule({
  declarations: [
    PurchaseInvoiceComponent,
    AddPurchaseInvoiceComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    PurchaseInvoiceRoutingModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class PurchaseInvoiceModule {}
