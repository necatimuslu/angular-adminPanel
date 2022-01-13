import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit , OnDestroy{

  orders!:Order[];
  endSubs$:Subject<any> = new Subject();
  constructor(private orderService:OrderService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this._getOrders();
  }
  ngOnDestroy():void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.endSubs$)).subscribe((data)=> {
      this.orders = data;
      console.log(this.orders)
    })
  }

  delete(id:string){
    this.confirmationService.confirm({
      message: 'Order silmek istediğinizden emin misiniz?',
      accept: () => {
          this.orderService.deleteOrder(id).subscribe(data => {
            this.messageService.add({severity:'success', summary:'Başarılı', detail:'Order silindi'});
            this._getOrders();
          },(err)=> {
            this.messageService.add({severity:'error', summary:'Hata', detail:'Order silinemedi'});
          })
      }
  });
  }
  showOrder(id:string){
    this.router.navigate([`order/${id}`]);
  }

}
