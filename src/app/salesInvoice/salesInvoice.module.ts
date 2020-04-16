import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../shared/angular-material-elements/material.module";
import {SalesInvoiceComponent} from "./salesInvoice/salesInvoice.component";
import {SalesInvoiceRoutingModule} from "./salesInvoice-routing.module";
import {AddSalesInvoiceComponent} from "./add-salesInvoice/add-salesInvoice.component";
@NgModule({
  declarations: [
    SalesInvoiceComponent,
    AddSalesInvoiceComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    SalesInvoiceRoutingModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class SalesInvoiceModule {}
