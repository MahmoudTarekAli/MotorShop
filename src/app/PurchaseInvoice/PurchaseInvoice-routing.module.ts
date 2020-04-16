import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseInvoiceComponent} from "./PurchaseInvoiceInvoice/PurchaseInvoice.component";
import {AddPurchaseInvoiceComponent} from "./add-PurchaseInvoiceInvoice/add-PurchaseInvoice.component";
const routes: Routes = [
  {
    path: 'AllPurchaseInvoice',
    component: PurchaseInvoiceComponent
  },
  {
    path: 'add-PurchaseInvoice',
    component: AddPurchaseInvoiceComponent
  },
  {
    path: 'update-PurchaseInvoice/:id',
    component: AddPurchaseInvoiceComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseInvoiceRoutingModule {}
