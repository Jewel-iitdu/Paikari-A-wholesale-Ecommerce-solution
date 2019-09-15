import { SharedModule } from './../shared/shared.module';
import { ConfigModule } from './../config/config.module';
import { CoreModule } from './../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-default/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { BlankComponent } from './blank/blank.component';
import { RootService } from './services/root.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavSideBarComponent,
    BlankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ConfigModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [RootService],
  bootstrap: [AppComponent]
})
export class AppModule { }
