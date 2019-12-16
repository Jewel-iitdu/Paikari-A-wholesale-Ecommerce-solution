import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderService } from "./services/order.service";
import { CartListComponent } from "./components/cart-list/cart-list.component";
import { OrderedListComponent } from "./components/ordered-list/ordered-list.component";
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/security-service/auth.guard';
import { CustomerGuard } from '../core/security-service/customer.guard';

const routes:Routes=[

  {
		path: 'cart',
    component: CartListComponent,
    canActivate:[AuthGuard,CustomerGuard]
  },
  {
    path: 'order-list',
    component: OrderedListComponent,
    canActivate:[AuthGuard]
  }
]

@NgModule({
  declarations: [CartListComponent, OrderedListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [OrderService]
})
export class OrderModule {}
