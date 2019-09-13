import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';


const routes:Routes=[

  {
		path: '',
		component:CustomerHomeComponent
	}
]

@NgModule({
  declarations: [CustomerHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
