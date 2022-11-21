import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginRouterComponent } from './Components/Generic/login-router/login-router.component'
import { LoginComponent } from './Components/Generic/login/login.component'
import { ClientLoginComponent } from './Components/Client/client-login/client-login.component'
import { ManagerLoginComponent } from './Components/Manager/manager-login/manager-login.component'
import { MemberLoginComponent } from './Components/Member/member-login/member-login.component'
import { MemberMenuComponent } from './Components/Member/member-menu/member-menu.component'
import { MemberMainComponent } from './Components/Member/member-main/member-main.component'
import { ManagerMainComponent } from './Components/Manager/manager-main/manager-main.component'
import { ManagerMenuComponent } from './Components/Manager/manager-menu/manager-menu.component'
import { ManagerListComponent } from './Components/Manager/manager-list/manager-list.component'
import { ManagerInfoComponent } from './Components/Manager/manager-info/manager-info.component'
import { DeliveryManListComponent } from './Components/Manager/delivery-man-list/delivery-man-list.component'
import { DeliveryManInfoComponent } from './Components/Manager/delivery-man-info/delivery-man-info.component'
import { StoreTypeListComponent } from './Components/Manager/store-type-list/store-type-list.component'
import { StoreTypeInfoComponent } from './Components/Manager/store-type-info/store-type-info.component'
import { StoreListComponent } from './Components/Manager/store-list/store-list.component'
import { StoreInfoComponent } from './Components/Manager/store-info/store-info.component'
import { MemberListComponent } from './Components/Manager/member-list/member-list.component'

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
    ]
  },
  {
    path: 'member',
    component: MemberMainComponent,
    children: [
      { path: '', redirectTo: '/member/menu', pathMatch: 'full' },
      { path: 'employees', component: ManagerListComponent },
      { path: 'employees/:id', component: ManagerInfoComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }