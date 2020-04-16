import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddMaintenanceComponent} from "./add-salesInvoice/add-maintenance.component";
import {MaintenanceComponent} from "./maintenance/maintenance.component";
const routes: Routes = [
  {
    path: 'AllMaintenance',
    component: MaintenanceComponent
  },
  {
    path: 'add-Maintenance',
    component: AddMaintenanceComponent
  },
  {
    path: 'update-Maintenance/:id',
    component: AddMaintenanceComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule {}
