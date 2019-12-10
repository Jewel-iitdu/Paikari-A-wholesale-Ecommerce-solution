import { CatergoryService } from "./../../services/catergory.service";
import { ProductService } from "./../../services/product.service";
import { ProductInformation } from "./../../../config/interfaces/product.interface";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap, finalize } from "rxjs/operators";
import { AngularFireUploadTask } from "angularfire2/storage";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from "firebase/app";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-modify-product",
  templateUrl: "./modify-product.component.html",
  styleUrls: ["./modify-product.component.scss"]
})
export class ModifyProductComponent implements OnInit {
  addProductForm: FormGroup;
  productid: any;
  // productData: any[];

  productInfo: ProductInformation = {
    productname: "",
    productprice: null,
    productquantity: null,
    productImageUrl: "",
    productDescription: "",
    category:"",
    created: null,
    supplierId: ""
  };;

  isPreview = false;

  // treeControl = new NestedTreeControl<CategoryList>(node => node.children);
  // categoryDataSource = new MatTreeNestedDataSource<CategoryList>();

  categoryData: any;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private fb: FormBuilder, 
    private ProductService: ProductService,
    private catergoryService: CatergoryService,
    private route: ActivatedRoute
  ) {
    // this.categoryDataSource.data = catergoryService.getCategories();
    this.categoryData = catergoryService.getCategories();
    let productId = this.route.snapshot.paramMap.get("id");
    if (productId) {
      this.getProductby(productId);
      this.productid = productId;
    }
  }

  // hasChild = (_: number, node: CategoryList) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.makingAddProductForm();
    this.ProductService.getAllCategory();
    // this.onChanges();
  }
  makingAddProductForm() {
    this.addProductForm = this.fb.group({
      productname: ['', [Validators.required]],
      productprice: ['', [Validators.required]],
      productquantity: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
    // this.productInfo.subscribe(productInfo => {
    //   this.addProductForm.patchValue(productInfo);
    // });
  }

  // onChanges(){
  //   this.addProductForm.valueChanges.subscribe(newValue =>{
  //     this.productInfo.productname = newValue,
  //     this.productInfo.productprice = newValue.productprice,
  //     this.productInfo.productquantity = newValue.productquantity,
  //     this.productInfo.productDescription = newValue.productDescription,
  //     this.productInfo.productImageUrl = newValue.productImageUrl,
  //     this.productInfo.category = newValue.category
  //   })
  // }

  onSubmit() {
    this.productInfo = {
      productname: this.addProductForm.value.productname,
      productprice: this.addProductForm.value.productprice,
      productquantity: this.addProductForm.value.productquantity,
      productDescription: this.addProductForm.value.productDescription,
      productImageUrl: this.productInfo.productImageUrl,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      category: this.addProductForm.value.category,
      supplierId: this.ProductService.userId
    };
    this.ProductService.updateProduct(this.productInfo, this.productid);
    // console.log(this.productInfo);
  }

  getProductby(productId) {
    this.ProductService.getProductByProductId(productId).subscribe(product => {
      this.patchData(product);
      this.productInfo = product;
    });
    // console.log(this.productInfo););
  }

  patchData(product: ProductInformation) {
    this.addProductForm.patchValue({
      productname: product.productname,
      productprice: product.productprice,
      productquantity: product.productquantity,
      productDescription: product.productDescription,
      category: product.category
    });
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
    this.isPreview = true;
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

    //Download URL file
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.storage.ref(path).getDownloadURL();
        this.downloadURL.subscribe(res => {
          if (res) {
            // this.imgDownloadUrl = res;
            this.productInfo.productImageUrl = '';
            this.productInfo.productImageUrl = res;
          }
        });
      })
    );

    // this.snapshot = this.task.snapshotChanges().pipe(
    //   // The file's download URL
    //   finalize(() => (this.downloadURL = fileRef.getDownloadURL())),
    //   tap(snap => {
    //     console.log(snap);
    //     if (snap.bytesTransferred === snap.totalBytes) {
    //       // Update firestore on completion

    //       // this.db.collection("photos").add({ path, size: snap.totalBytes });
    //       // this.downloadURL.subscribe(url=>{if(url){
    //       //   this.imgDownloadUrl = url;
    //       // }});
    //       // this.imgDownloadUrl = path;

    //     }
    //   })
    // );
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
