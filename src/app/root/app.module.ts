import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from "./../shared/shared.module";
import { ConfigModule } from "./../config/config.module";
import { CoreModule } from "./../core/core.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./root-default/app.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NavSideBarComponent } from "./nav-side-bar/nav-side-bar.component";
import { BlankComponent } from "./blank/blank.component";
import { RootService } from "./services/root.service";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
// import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../../environments/environment";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";
import { SharedService } from "../shared/services/shared.service";
// import { AngularFireStorage} from 'angularfire2/storage';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { MenuItemBarComponent } from './menu-item-bar/menu-item-bar.component';
import { MatTableModule, MatMenuModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatProgressBarModule, MatSnackBarModule, MatDialogModule, MatButtonToggleModule, MatPaginatorModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { PasswordChangeComponent } from './password-change/password-change.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavSideBarComponent,
    BlankComponent,
    MenuItemBarComponent,
    PasswordChangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ConfigModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    AngularFireStorageModule,
    CdkTableModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [RootService, SharedService],
  bootstrap: [AppComponent],
  entryComponents: [ PasswordChangeComponent]
})
export class AppModule {}
