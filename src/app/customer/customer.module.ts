import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';



@NgModule({
  declarations: [DashboardComponent, TransactionHistoryComponent, CustomerInformationComponent],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
