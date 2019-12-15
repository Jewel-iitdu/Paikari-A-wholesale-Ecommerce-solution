import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './services/order.service';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { OrderedListComponent } from './components/ordered-list/ordered-list.component';



@NgModule({
  declarations: [CartListComponent, OrderedListComponent],
  imports: [
    CommonModule
  ],
  providers:[OrderService]
})
export class OrderModule { }
