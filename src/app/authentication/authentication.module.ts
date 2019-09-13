import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';


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
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule { }
