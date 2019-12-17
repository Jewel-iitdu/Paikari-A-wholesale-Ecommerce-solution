import { ProfileService } from './../../../root/services/profile.service';
import { UserInformation, CustomerUserInformation } from 'src/app/config/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SecurityService } from 'src/app/core/security-service/security.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  UpdateProfileForm:FormGroup;
  userInfo: CustomerUserInformation;
  role;

  constructor(private storage: AngularFireStorage,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private sharedService: SharedService,
    private sec:SecurityService
    ) { }

  ngOnInit() {
    this.makingAddProductForm();
    this.customerService.getUserInfo().subscribe(res=>{
      this.pathData(res);
      this.userInfo = res;
      // console.log(res)
    });
    this.sec.getRole().subscribe(res=>{
      this.role = res;
    })
  }
  pathData(res) {
    this.UpdateProfileForm.patchValue({
      name: res.data.name,
      // companyname: res.data.companyname,
      useraddress: res.data.useraddress
    })
  }
  makingAddProductForm() {
    this.UpdateProfileForm = this.fb.group({
      name: ["", [Validators.required]],
      // companyname: ["", [Validators.required]],
      useraddress: ["", [Validators.required]],
    });
  }

  onSubmit(){
    this.userInfo ={
      name: this.UpdateProfileForm.value.name,
      // companyname: this.UpdateProfileForm.value.companyname,
      useraddress: this.UpdateProfileForm.value.useraddress,
      photoURL: this.getImageUrl()
    }
    this.customerService.updateUserInfo(this.userInfo);
    this.showSnackbar();
  }

  showSnackbar() {
		this.sharedService.openSnackBar({
			duration: 2,
			data: {
				isAccepted: true,
				message: 'Profile Information Updated'
			},
			panelClass: [ 'recovery-snackbar' ]
		});
	}
  getImageUrl(){
    if(this.imgDownloadUrl == null){
      if(this.userInfo.photoURL == null){
        return ""
      }
      else{
        return this.userInfo.photoURL
      }
    }
    else{
      return this.imgDownloadUrl;
    }
  }

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  //download url string
  imgDownloadUrl: string;

  // State for dropzone CSS toggling
  isHovering: boolean;

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // this.isPreview = true;
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    // The storage path
    const path = `User/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    // Totally optional metadata
    const customMetadata = { app: "My AngularFire-powered PWA!" };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    //Download URL file
    this.snapshot = this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = this.storage.ref(path).getDownloadURL()
          console.log(this.downloadURL); // Get a Observable
          this.downloadURL.subscribe(res => {
            if (res) {
              this.imgDownloadUrl = res;
            }
          });
        })
      );

    
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  

}
