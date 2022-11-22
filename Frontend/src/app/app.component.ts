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

        console.log(userType);
        console.log(urlBase);

        if (urlBase === 'logout') {
          this.loginService.logout()
        }
        else if ((urlBase === 'login' || urlBase.length === 0) && userType.length > 0) {
          this.router.navigate([`/${userType}`])
        }
        else if (urlBase !== 'login' && userType.length === 0) {
          this.router.navigate(['/login'])
        }

        // switch (urlBase) {
        //   case 'logout':
        //     this.loginService.logout()
        //     break
        //   default:
        //     if (userType.length > 0) { window.location.href = `/${userType}` }
        //     else if (urlBase !== 'login') { window.location.href = '/login' }
        //     break
        // }
      }
    })
  }
}

const apiURL = 'https://localhost:7156'

export default AppComponent
export { AppComponent, apiURL }