import { AuthGuard } from './../core/security-service/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerGuard } from '../core/security-service/customer.guard';


const routes:Routes=[

  {
		path: '',
    component:CustomerHomeComponent,
    canActivate:[AuthGuard,CustomerGuard]
	}
]

@NgModule({
  declarations: [CustomerHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { 

  
}
