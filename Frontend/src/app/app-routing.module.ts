import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginRouterComponent } from './Components/Generic/login-router/login-router.component';
import { LoginComponent } from './Components/Generic/login/login.component';
import { ClientLoginComponent } from './Components/Client/login/login.component';
import { ManagerLoginComponent } from './Components/Manager/login/login.component';
import { MemberLoginComponent } from './Components/Member/login/login.component';

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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }