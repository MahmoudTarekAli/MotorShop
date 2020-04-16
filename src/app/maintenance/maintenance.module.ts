import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatRippleModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../shared/angular-material-elements/material.module";
import {MaintenanceRoutingModule} from "./maintenance-routing.module";
import {AddMaintenanceComponent} from "./add-salesInvoice/add-maintenance.component";
import {MaintenanceComponent} from "./maintenance/maintenance.component";
@NgModule({
  declarations: [
    MaintenanceComponent,
    AddMaintenanceComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MaintenanceRoutingModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class MaintenanceModule {}
