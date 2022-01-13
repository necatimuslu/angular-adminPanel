import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit , OnDestroy{

  categories!:Category[];
  endSubs$:Subject<any> = new Subject();
  constructor(private categoryService:CategoryService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {
    this._getCategories();
  }
  ngOnDestroy():void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((data)=> {
      this.categories = data;
    })
  }

  delete(id:string){
    this.confirmationService.confirm({
      message: 'Seçilen Kategoriyi silmek istediğinizden emin misiniz?',
      accept: () => {
          this.categoryService.deleteCategory(id).subscribe((data)=> {
            this.messageService.add({severity:'success', summary:'Başarılı', detail:'Category silindi'});
            this._getCategories();
          },(err)=> {
            this.messageService.add({severity:'error', summary:'Hata ', detail:'Category silinemedi'});
          })
      }
  });
  }
  update(id:string){
    this.router.navigateByUrl(`category/form/${id}`);
  }

  redirect(){
    this.router.navigate(['category/form']);
  }
}
