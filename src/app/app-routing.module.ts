import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CanActivateViaAuthGuard} from "./authentication/auth-guard/auth.guard";

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'PurchaseInvoice',
    loadChildren: () =>
      import('./PurchaseInvoice/PurchaseInvoice.module').then(m => m.PurchaseInvoiceModule)
  },
  {
    path: 'saleInvoice',
    loadChildren: () =>
      import('./salesInvoice/salesInvoice.module').then(m => m.SalesInvoiceModule)
  },
  {
    path: 'maintenance',
    loadChildren: () =>
      import('./maintenance/maintenance.module').then(m => m.MaintenanceModule)
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
