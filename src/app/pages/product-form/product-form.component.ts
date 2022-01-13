import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  editMode = false;
  currentProductId!:string;
  form!:FormGroup;
  isSubmitting = false
  imageDisplay!:string | ArrayBuffer | any; 
  categories!:Category[];
  endSubs$:Subject<any> = new Subject();
  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private categoryService:CategoryService,
    private route:ActivatedRoute,
    private messageService:MessageService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this._initProductForm();
    this._checkEditMode();
    this._getCategories();

  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((data)=> {
      this.categories = data;
    })
  }
  private _checkEditMode(){
    this.route.params.subscribe(param => {
      if(param.id){
        this.editMode = true;
        this.currentProductId = param.id;
        this.productService.getProductById(param.id).subscribe((product)=> {
          this.form.controls.name.setValue(product.name);
          this.form.controls.description.setValue(product.description);
          this.form.controls.richDescription.setValue(product.richDescription);
          this.form.controls.brand.setValue(product.brand);
          this.form.controls.price.setValue(product.price);
          this.form.controls.rating.setValue(product.rating);
          this.form.controls.isFeatured.setValue(product.isFeatured);
          this.form.controls.category.setValue(product.category);
          this.imageDisplay = product.image;
          this.form.controls.image.setValidators([]);
          this.form.controls.image.updateValueAndValidity();
        })
      }
    })
  }

  private _initProductForm(){
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      richDescription:[''],
      image:[''],
      brand:[''],
      price:[1],
      rating:[0],
      isFeatured:[false],
      category:['']
    });
  }

  onSubmit(){
    this.isSubmitting = true;
    if(this.form.invalid){
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.form.controls).map(key => {
      productFormData.append(key,this.form.controls[key].value);
    });

    if(this.editMode){
      this._updateProduct(productFormData);
    }else{
      this._addProduct(productFormData);
    }

  }
  private _addProduct(formData:FormData){
    this.productService.createProduct(formData).subscribe((data)=> {
      this.messageService.add({severity:'success', summary:'Başarılı', detail:'Product eklendi'});
      timer(1000).toPromise().then(()=> this.router.navigateByUrl('product'));
    },(err)=> {
      this.messageService.add({severity:'error', summary:'Hata', detail:'Product eklenemedi'});
    })
  }

  private _updateProduct(formData:FormData){
    this.productService.updateProduct(this.currentProductId,formData).subscribe((data)=> {
      this.messageService.add({severity:'success', summary:'Başarılı', detail:'Product güncellendi'});
      timer(1000).toPromise().then(()=> this.router.navigateByUrl('product'));
    },(err)=> {
      this.messageService.add({severity:'error', summary:'Hata', detail:'Product güncellenmedi'});
    })
  }
  onCancel(){
    this.router.navigate(['product']);
  }

  onImageUpload(event:any){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image:file});
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = ()=> {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

}
