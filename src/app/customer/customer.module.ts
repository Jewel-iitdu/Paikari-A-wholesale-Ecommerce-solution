import { AuthGuard } from './../core/security-service/auth.guard';
import { AdminGuard } from './../core/security-service/admin.guard';
import { SupplierGuard } from './../core/security-service/supplier.guard';
import { CustomerGuard } from './../core/security-service/customer.guard';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes:Routes=[

  {
		path: 'my-account',
    component:CustomerInformationComponent,
    canActivate:[AuthGuard]
  },
  {
		path: 'update-my-account',
    component:UpdateUserProfileComponent,
    canActivate:[AuthGuard]
    
  },
  {
		path: 'transactions',
    component:TransactionHistoryComponent,
    canActivate:[AuthGuard,CustomerGuard]
    
  }
]

@NgModule({
  declarations: [DashboardComponent, TransactionHistoryComponent, CustomerInformationComponent, UpdateUserProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
