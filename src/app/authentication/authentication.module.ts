import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { SharedModule } from '../shared/shared.module';


const routes:Routes=[
  {
    path:'',
    redirectTo:'sign-in'
  },

  {
		path: 'sign-in',
		component:SigninComponent
	}
]

@NgModule({
  declarations: [ SigninComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthenticationModule { }
