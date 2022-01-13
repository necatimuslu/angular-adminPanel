import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../modules/primeng.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';



@NgModule({
  declarations: [CategoryListComponent,CategoryFormComponent,DashboardComponent, ProductListComponent, ProductFormComponent, OrderListComponent, OrderDetailComponent, UserListComponent, UserFormComponent],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
