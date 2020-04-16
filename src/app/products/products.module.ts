import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './product/Products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../shared/angular-material-elements/material.module";
@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    ProductsRoutingModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class ProductsModule {}
