import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users!:User[];
  endSubs$:Subject<any> = new Subject();
  constructor(private userService:UserService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers(){
    this.userService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe(data => {
      this.users =data;
    })
  }

  delete(id:string){
    this.confirmationService.confirm({
      message: 'Seçilen User i silmek istediğinizden emin misiniz?',
      accept: () => {
          this.userService.deleteUser(id).subscribe(data => {
            this.messageService.add({severity:'success', summary:'Başarılı', detail:'User Silindi'});
            this._getUsers();
          },(err)=> {
            this.messageService.add({severity:'error', summary:'Hata', detail:'User silinemedi'});
          })
      }
  });
  }
  update(id:string){
    this.router.navigate([`user/form/${id}`]);
  }
}
