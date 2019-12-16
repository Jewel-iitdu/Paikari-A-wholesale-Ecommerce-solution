import { CustomerGuard } from './../core/security-service/customer.guard';
import { AuthGuard } from './../core/security-service/auth.guard';
import { MenuItemBarComponent } from './menu-item-bar/menu-item-bar.component';
import { Routes } from "@angular/router";
import { NavSideBarComponent } from "./nav-side-bar/nav-side-bar.component";
import { BlankComponent } from "./blank/blank.component";
import { canActivate } from '@angular/fire/auth-guard';

export const routes: Routes = [
    {
      path: "",
      redirectTo: "authentication",
      pathMatch: "full"
    },
  {
    path: "",
    component: MenuItemBarComponent,
    children: [
      {
        path: "home",
        loadChildren: "../home/home.module#HomeModule"
      }
    ],
    // canActivate:[AuthGuard]
  },
  {
    path: "",
    component: MenuItemBarComponent,
    children: [
      {
        path: "product",
        loadChildren: "../product/product.module#ProductModule"
      }
    ],
    // canActivate:[AuthGuard]
  },
  {
    path: "",
    component: BlankComponent,
    children: [
      {
        path: "authentication",
        loadChildren:
          "../authentication/authentication.module#AuthenticationModule"
      }
    ]
  },
  {
    path: "",
    component: MenuItemBarComponent,
    children: [
      {
        path: "user",
        loadChildren:
          "../customer/customer.module#CustomerModule"
      }
    ],
    // canActivate:[AuthGuard]
  },
  {
    path: "",
    component: MenuItemBarComponent,
    children: [
      {
        path: "order",
        loadChildren:
          "../order/order.module#OrderModule"
      }
    ],
    // canActivate:[AuthGuard]
  },
  {
    path: "",
    component: MenuItemBarComponent,
    children: [
      {
        path: "admin",
        loadChildren:
          "../admin/admin.module#AdminModule"
      }
    ],
    // canActivate:[AuthGuard]
  }

];
