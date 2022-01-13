import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CategoryListComponent } from '../pages/category-list/category-list.component';
import { CategoryFormComponent } from '../pages/category-form/category-form.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductFormComponent } from '../pages/product-form/product-form.component';
import { OrderListComponent } from '../pages/order-list/order-list.component';
import { OrderDetailComponent } from '../pages/order-detail/order-detail.component';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { UserFormComponent } from '../pages/user-form/user-form.component';

const routes:Routes = [
  {path:'',component:ShellComponent,
  children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'category',component:CategoryListComponent},
    {path:'category/form',component:CategoryFormComponent},
    {path:'category/form/:id',component:CategoryFormComponent},
    {path:'product',component:ProductListComponent},
    {path:'product/form',component:ProductFormComponent},
    {path:'product/form/:id',component:ProductFormComponent},
    {path:'user',component:UserListComponent},
    {path:'user/form',component:UserFormComponent},
    {path:'user/form/:id',component:UserFormComponent},
    {path:'order',component:OrderListComponent},
    {path:'order/:detail',component:OrderDetailComponent},
  ]

  }
]

@NgModule({
  declarations: [
    ShellComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
