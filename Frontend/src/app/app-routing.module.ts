import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginRouterComponent } from './Components/Generic/login-router/login-router.component';
import { LoginComponent } from './Components/Generic/login/login.component';
import { ClientLoginComponent } from './Components/Client/client-login/client-login.component';
import { ManagerLoginComponent } from './Components/Manager/manager-login/manager-login.component';
import { MemberLoginComponent } from './Components/Member/member-login/member-login.component';
import { ManagerMainComponent } from './Components/Manager/manager-main/manager-main.component';
import { ManagerMenuComponent } from './Components/Manager/manager-menu/manager-menu.component';
import { ManagerListComponent } from './Components/Manager/manager-list/manager-list.component';
import { ManagerInfoComponent } from './Components/Manager/manager-info/manager-info.component';

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
  {
    path: 'manager',
    component: ManagerMainComponent,
    children: [
      { path: '', redirectTo: '/manager/menu', pathMatch: 'full' },
      { path: 'employees', component: ManagerListComponent },
      { path: 'employees/:id', component: ManagerInfoComponent },
      // { path: 'members', component: MemberLoginComponent },
      // { path: 'clients', component: ClientLoginComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }