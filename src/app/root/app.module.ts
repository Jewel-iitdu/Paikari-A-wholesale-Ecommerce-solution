import { SharedModule } from './../shared/shared.module';
import { ConfigModule } from './../config/config.module';
import { CoreModule } from './../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-default/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { BlankComponent } from './blank/blank.component';
import { RootService } from './services/root.service';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavSideBarComponent,
    BlankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ConfigModule
  ],
  providers: [RootService],
  bootstrap: [AppComponent]
})
export class AppModule { }
