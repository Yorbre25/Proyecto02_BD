import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginRouterComponent } from './Components/Generic/login-router/login-router.component';
import { LoginComponent } from './Components/Generic/login/login.component';
import { ClientLoginComponent } from './Components/Client/client-login/client-login.component';
import { ManagerLoginComponent } from './Components/Manager/manager-login/manager-login.component';
import { MemberLoginComponent } from './Components/Member/member-login/member-login.component';
import { MemberMenuComponent } from './Components/Member/member-menu/member-menu.component';
import { MemberMainComponent } from './Components/Member/member-main/member-main.component';
import { ManagerMainComponent } from './Components/Manager/manager-main/manager-main.component';
import { ManagerMenuComponent } from './Components/Manager/manager-menu/manager-menu.component';
import { ManagerListComponent } from './Components/Manager/manager-list/manager-list.component';
import { ManagerInfoComponent } from './Components/Manager/manager-info/manager-info.component';
import { DeliveryManListComponent } from './Components/Manager/delivery-man-list/delivery-man-list.component';
import { DeliveryManInfoComponent } from './Components/Manager/delivery-man-info/delivery-man-info.component';
import { MemberAdministrationComponent } from './Components/Member/member-administration/member-administration.component';
import { MemberProductManagementComponent } from './Components/Member/member-product-management/member-product-management.component';
import { MemberOrdersComponent } from './Components/Member/member-orders/member-orders.component';

import { ClientMainComponent } from './Components/Client/client-main/client-main.component';
import { ClientMenuComponent } from './Components/Client/client-menu/client-menu.component';
import { ClientBusinessComponent } from './Components/Client/client-business/client-business.component';
import { ClientCartComponent } from './Components/Client/client-cart/client-cart.component';
import { ClientOrderComponent } from './Components/Client/client-order/client-order.component';
import { ClientRecentsComponent } from './Components/Client/client-recents/client-recents.component';
import { ClientSTOREComponent } from './Components/Client/client-store/client-store.component';

import { StoreTypeListComponent } from './Components/Manager/store-type-list/store-type-list.component'
import { StoreTypeInfoComponent } from './Components/Manager/store-type-info/store-type-info.component'
import { StoreInfoComponent } from './Components/Manager/store-info/store-info.component'
import { MemberListComponent } from './Components/Manager/member-list/member-list.component'
import { ReportsComponent } from './Components/Manager/reports/reports.component'
import { MemberProductInfoComponent } from './Components/Member/member-product-info/member-product-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginRouterComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'manager', component: ManagerLoginComponent },
      { path: 'member', component: MemberLoginComponent },
      { path: 'client', component: ClientLoginComponent }
    ]
  },
  { path: 'manager/menu', component: ManagerMenuComponent },
  { path: 'member/menu', component: MemberMenuComponent },
  { path: 'client/menu', component: ClientMenuComponent },
  {
    path: 'manager',
    component: ManagerMainComponent,
    children: [
      { path: '', redirectTo: '/manager/menu', pathMatch: 'full' },
      { path: 'employees', component: ManagerListComponent },
      { path: 'employees/:id', component: ManagerInfoComponent },
      { path: 'delivery_men', component: DeliveryManListComponent },
      { path: 'delivery_men/:id', component: DeliveryManInfoComponent },
      { path: 'stores', component: MemberListComponent },
      { path: 'stores/:id', component: StoreInfoComponent },
      { path: 'store_types', component: StoreTypeListComponent },
      { path: 'store_types/:id', component: StoreTypeInfoComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  },
  {
    path: 'member',
    component: MemberMainComponent,
    children: [
      { path: '', redirectTo: '/member/menu', pathMatch: 'full' },
      { path: 'administration', component: MemberAdministrationComponent },
      { path: 'orders', component: MemberOrdersComponent },
      { path: 'product_management', component: MemberProductManagementComponent },
      { path: 'product_management/:id', component: MemberProductInfoComponent },
    ]
  },
  {
    path: 'client',
    component: ClientMainComponent,
    children: [
      { path: '', redirectTo: '/client/menu', pathMatch: 'full' },
      { path: 'stores', component: ClientBusinessComponent },
      { path: 'stores/:id', component: ClientSTOREComponent },
      { path: 'cart', component: ClientCartComponent },
      { path: 'recent', component: ClientRecentsComponent },
      { path: 'order', component: ClientOrderComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }