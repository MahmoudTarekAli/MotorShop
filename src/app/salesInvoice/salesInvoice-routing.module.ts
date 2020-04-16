import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SalesInvoiceComponent} from "./salesInvoice/salesInvoice.component";
import {AddSalesInvoiceComponent} from "./add-salesInvoice/add-salesInvoice.component";
const routes: Routes = [
  {
    path: 'AllSalesInvoice',
    component: SalesInvoiceComponent
  },
  {
    path: 'add-saleInvoice',
    component: AddSalesInvoiceComponent
  },
  {
    path: 'update-saleInvoice/:id',
    component: AddSalesInvoiceComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesInvoiceRoutingModule {}
