import { ProductService } from "./../../services/product.service";
import { ProductInformation } from "./../../../config/interfaces/product.interface";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap, finalize } from "rxjs/operators";
import { AngularFireUploadTask } from "angularfire2/storage";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  ProductService: ProductService;
  productInfo: ProductInformation ={productname:'',productprice: null, productquantity: null};
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.makingAddProductForm();
  }
  makingAddProductForm() {
    this.addProductForm = this.fb.group({
      productname: ["", [Validators.required]],
      productprice: ["", [Validators.required]],
      productquantity: ["", [Validators.required]]
    });
    // this.productInfo.subscribe(productInfo => {
    //   this.addProductForm.patchValue(productInfo);
    // });
  }

  onSubmit() {
     this.ProductService.createProduct(this.productInfo);
    // console.log(this.productInfo);
  }

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    // The storage path
    const path = `Product/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    // Totally optional metadata
    const customMetadata = { app: "My AngularFire-powered PWA!" };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      // The file's download URL
      finalize(() => (this.downloadURL = fileRef.getDownloadURL())),
      tap(snap => {
        console.log(snap);
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection("photos").add({ path, size: snap.totalBytes });
        }
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