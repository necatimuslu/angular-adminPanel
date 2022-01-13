import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CrateCategory } from 'src/app/models/createCategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  editMode = false;
  form!:FormGroup;
  isSubmitting = false;
  currentCategoryId!:string;
  endSubs$:Subject<any> = new Subject();
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private categoryService:CategoryService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {
    this._initCategoryForm();
    this._chechkEditMode();
  }

  ngOnDestroy():void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _chechkEditMode(){
    this.route.params.subscribe(param => {
      if(param.id){
        this.editMode = true;
        this.currentCategoryId = param.id;
        this.categoryService.getCategoryById(param.id).pipe(takeUntil(this.endSubs$)).subscribe((category)=> {
          this.form.controls.name.setValue(category.name);
          this.form.controls.color.setValue(category.color);
          this.form.controls.icon.setValue(category.icon);
        })
      }
    })
  }

  private _initCategoryForm(){
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      color:[''],
      icon:['',Validators.required]
    });
  }

  onSubmit(){
    this.isSubmitting = true;
    if(this.form.invalid){
      return;
    }
    const category:CrateCategory = {
      name:this.form.controls.name.value,
      color:this.form.controls.color.value,
      icon:this.form.controls.icon.value
    }

    if(this.editMode){
      this._updateCategory(category)
    }else {
      this._addCategory(category)
    }

  }

  private _addCategory(category:CrateCategory){
    this.categoryService.createCategory(category).subscribe((data)=> {
      this.messageService.add({severity:'success', summary:'Başarılı', detail:'Kategory oluşturuldu'});
      timer(1000).toPromise().then(()=> {
        this.router.navigate(['category']);
      })
    },(err)=> {
      this.messageService.add({severity:'error', summary:'Hata', detail:'Kategori oluşturulamadı'});
    })
  }

  private _updateCategory(category:CrateCategory){
    this.categoryService.updateCategory(this.currentCategoryId,category).subscribe((data)=> {
      this.messageService.add({severity:'success', summary:'Başarılı', detail:'Kategory güncellendi'});
      timer(1000).toPromise().then(()=> {
        this.router.navigate(['category']);
      })
    },(err)=> {
      this.messageService.add({severity:'error', summary:'Hata', detail:'Kategori güncellenemedi'});
    })
  }

  onCancel(){
    this.router.navigate(['category']);
  }
}
