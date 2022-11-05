import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
class AppComponent {
  title = 'UbyTEC';
}

const apiURL = 'https://localhost:7156'

export default AppComponent
export { AppComponent, apiURL }