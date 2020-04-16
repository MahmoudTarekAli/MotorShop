import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCategoriesComponent } from './allCategories/allCategories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'AllCategories',
    pathMatch: 'full'
  },
  {
    path: 'AllCategories',
    component: AllCategoriesComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  },
  {
    path: 'update-category/:id',
    component: AddCategoryComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
