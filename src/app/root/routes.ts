import { MenuItemBarComponent } from './menu-item-bar/menu-item-bar.component';
import { Routes } from "@angular/router";
import { NavSideBarComponent } from "./nav-side-bar/nav-side-bar.component";
import { BlankComponent } from "./blank/blank.component";

export const routes: Routes = [
  //   {
  //     path: "",
  //     redirectTo: "authentication",
  //     pathMatch: "full"
  //   },
  {
    path: "",
    component: MenuItemBarComponent,
    children: [
      {
        path: "home",
        loadChildren: "../home/home.module#HomeModule"
      }
    ]
  },
  {
    path: "",
    component: MenuItemBarComponent,
    children: [
      {
        path: "product",
        loadChildren: "../product/product.module#ProductModule"
      }
    ]
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
    ]
  }
];
