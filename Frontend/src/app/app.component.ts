import { CookieService } from 'ngx-cookie-service'

import { Component } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'

import { LoginService } from './Services/login-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
class AppComponent {
  title = 'UbyTEC'

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService
  ) {
    this.router.events.subscribe((event: any): void => {
      if (event instanceof NavigationStart) {
        const urlBase = event.url.split('/')[1]
        const userType = this.cookieService.get('userType')

        switch (urlBase) {
          case 'login':
            if (userType) { window.location.href = `/${userType}` }
            break
          case 'logout':
            this.loginService.logout()
            break
          case 'manager':
            if (userType !== 'manager') { window.location.href = `/${userType}` }
            break
          case 'member':
            if (userType !== 'member') { window.location.href = `/${userType}` }
            break
          case 'client':
            if (userType !== 'client') { window.location.href = `/${userType}` }
            break
          default:
            window.location.href = `/login`
            break
        }
      }
    })
  }
}

const apiURL = 'https://localhost:7156'

export default AppComponent
export { AppComponent, apiURL }