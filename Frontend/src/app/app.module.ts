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
import { ReactiveFormsModule } from '@angular/forms'
import { LoginFormComponent } from './Components/Forms/login-form/login-form.component'
import { ManagerLoginComponent } from './Components/Manager/login/login.component'
import { MemberLoginComponent } from './Components/Member/login/login.component'
import { ClientLoginComponent } from './Components/Client/login/login.component'

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
    LoginFormComponent
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
