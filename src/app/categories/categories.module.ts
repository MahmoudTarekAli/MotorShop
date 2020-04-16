import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AllCategoriesComponent } from './allCategories/allCategories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../shared/angular-material-elements/material.module";
@NgModule({
  declarations: [
    AllCategoriesComponent,
    AddCategoryComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    CategoriesRoutingModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class CategoriesModule {}
