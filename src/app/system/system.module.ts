import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { SystemRoutingModule } from "./system-routing.module";
import { SystemComponent } from "./system.component";
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SidebarComponent } from './shared/componenents/sidebar/sidebar.component';
import { HeaderComponent } from './shared/componenents/header/header.component';
import { DropdownDirective } from "./shared/directives/dropdown.directive";
import { BillService } from "./shared/services/bill.service";

@NgModule({
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
  ],
  providers: [BillService]
})
export class SystemModule {}
