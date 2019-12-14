import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { snackbar } from '../../config/interfaces/config.interface';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
// import { PasswordChangeComponent } from 'src/app/profile/components/password-change/password-change.component';

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	// Username = new BehaviorSubject('');
	// $username= this.Username.asObservable();
	// menuIndex = new BehaviorSubject<number>(1);
	// $menuIndex = this.menuIndex.asObservable();
	constructor(private snackbar: MatSnackBar, public dialog: MatDialog, private spinner: NgxSpinnerService) {}

	openSnackBar(configuration: snackbar) {
		this.snackbar.openFromComponent(SnackbarComponent, {
			duration: (configuration.duration ? configuration.duration : 1) * 1000,
			data: configuration.data,
			horizontalPosition: configuration.horizontalPosition ? configuration.horizontalPosition : 'right',
			verticalPosition: configuration.verticalPosition ? configuration.verticalPosition : 'top',
			panelClass: configuration.panelClass ? configuration.panelClass : null
		});
  }
  
  showSpinner(){
    this.spinner.show();
  }
  hideSpinner(){
    this.spinner.hide();
  }
}
