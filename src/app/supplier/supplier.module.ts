import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';



@NgModule({
  declarations: [DashboardComponent, TransactionHistoryComponent],
  imports: [
    CommonModule
  ]
})
export class SupplierModule { }
