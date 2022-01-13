import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit , OnDestroy{

  products!:Product[];
  endSubs$:Subject<any> = new Subject();
  constructor(private productService:ProductService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy():void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe((data)=> {
      this.products = data;
    })
  }
  redirect(){
    this.router.navigate(['product/form']);
  }
  delete(id:string){
    this.confirmationService.confirm({
      message: 'Seçilen Ürünü silmek istediğinizden emin misiniz',
      accept: () => {
          this.productService.deleteProduct(id).subscribe((data)=> {
            this.messageService.add({severity:'success', summary:'Başarılı', detail:'Product silindi '});
            this._getProducts();
          },(err)=> {
            this.messageService.add({severity:'error', summary:'Hata', detail:'Product silinemedi'});
          })
      }
  });
  }
  update(id:string){
    this.router.navigateByUrl(`product/form/${id}`);
  }
}
