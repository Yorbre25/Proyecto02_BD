import Cookies from 'js-cookie'

import { Component } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
class AppComponent {
  title = 'UbyTEC'

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event: any): void => {
      window.addEventListener('DOMContentLoaded', (): void => {
        if (event instanceof NavigationStart) {
          const urlBase = event.url.split('/')[1]
          const userType = Cookies.get('userType')

          console.log(urlBase, userType);


          if ((urlBase === 'login' || urlBase.length === 0) && userType) {
            this.router.navigate([`/${userType}`])
          }
          else if (urlBase !== 'login' && urlBase !== 'client' && !userType) {
            this.router.navigate(['/login'])
          }
        }
      })
    })
  }
}

const apiURL = 'https://apiubytec.azurewebsites.net'
// const apiURL = 'https://localhost:7156'

export default AppComponent
export { AppComponent, apiURL }