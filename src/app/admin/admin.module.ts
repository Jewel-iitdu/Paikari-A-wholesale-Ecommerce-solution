import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintBoxComponent } from './components/complaint-box/complaint-box.component';
import { AuthGuard } from '../core/security-service/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes:Routes=[

  {
		path: 'complaint-box',
    component:ComplaintBoxComponent,
    canActivate:[]
  }]

@NgModule({
  declarations: [ComplaintBoxComponent],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
