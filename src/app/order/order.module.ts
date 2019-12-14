import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './services/order.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[OrderService]
})
export class OrderModule { }
