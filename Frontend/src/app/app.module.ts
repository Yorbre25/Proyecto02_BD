import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { MessageComponent } from './Components/Generic/message/message.component'
import { NavbarComponent } from './Components/Generic/navbar/navbar.component'
import { InfoCardComponent } from './Components/Generic/info-card/info-card.component'
import { TableComponent } from './Components/Generic/table/table.component'
import { ModalComponent } from './Components/Generic/modal/modal.component';
import { MultivaluedInputComponent } from './Components/Generic/multivalued-input/multivalued-input.component'
import { MultivaluedSelectComponent } from './Components/Generic/multivalued-select/multivalued-select.component';

import { LoginRouterComponent } from './Components/Generic/login-router/login-router.component';
import { LoginComponent } from './Components/Generic/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './Components/Forms/login-form/login-form.component';
import { MemberLoginComponent } from './Components/Member/member-login/member-login.component';
import { MemberMenuComponent } from './Components/Member/member-menu/member-menu.component';
import { ClientLoginComponent } from './Components/Client/client-login/client-login.component';
import { ManagerMainComponent } from './Components/Manager/manager-main/manager-main.component';
import { ManagerMenuComponent } from './Components/Manager/manager-menu/manager-menu.component';
import { ManagerListComponent } from './Components/Manager/manager-list/manager-list.component';
import { ManagerInfoComponent } from './Components/Manager/manager-info/manager-info.component';
import { AddManagerFormComponent } from './Components/Forms/add-manager-form/add-manager-form.component';
import { EditManagerFormComponent } from './Components/Forms/edit-manager-form/edit-manager-form.component';
import { DeliveryManListComponent } from './Components/Manager/delivery-man-list/delivery-man-list.component';
import { DeliveryManInfoComponent } from './Components/Manager/delivery-man-info/delivery-man-info.component'
import { MemberMainComponent } from './Components/Member/member-main/member-main.component';
import { AddDeliveryManFormComponent } from './Components/Forms/add-delivery-man-form/add-delivery-man-form.component';
import { StoreTypeListComponent } from './Components/Manager/store-type-list/store-type-list.component';
import { StoreTypeInfoComponent } from './Components/Manager/store-type-info/store-type-info.component';
import { AddStoreTypeFormComponent } from './Components/Forms/add-store-type-form/add-store-type-form.component';
import { AddStoreFormComponent } from './Components/Forms/add-store-form/add-store-form.component';
import { StoreInfoComponent } from './Components/Manager/store-info/store-info.component';
import { StoreListComponent } from './Components/Manager/store-list/store-list.component';
import { StoreFormComponent } from './Components/Forms/store-form/store-form.component';
import { StoreManagerFormComponent } from './Components/Forms/store-manager-form/store-manager-form.component';
import { ManagerLoginComponent } from './Components/Manager/manager-login/manager-login.component'

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NavbarComponent,
    TableComponent,
    InfoCardComponent,
    ModalComponent,
    MultivaluedInputComponent,
    MultivaluedSelectComponent,
    LoginRouterComponent,
    LoginComponent,
    ManagerLoginComponent,
    MemberLoginComponent,
    ClientLoginComponent,
    LoginFormComponent,
    ManagerMainComponent,
    ManagerMenuComponent,
    ManagerListComponent,
    ManagerInfoComponent,
    AddManagerFormComponent,
    EditManagerFormComponent,
    DeliveryManListComponent,
    DeliveryManInfoComponent,
    MemberMenuComponent,
    MemberMainComponent,
    MemberLoginComponent,
    AddDeliveryManFormComponent,
    StoreTypeListComponent,
    StoreTypeInfoComponent,
    AddStoreTypeFormComponent,
    AddStoreFormComponent,
    StoreInfoComponent,
    StoreListComponent,
    StoreFormComponent,
    StoreManagerFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
