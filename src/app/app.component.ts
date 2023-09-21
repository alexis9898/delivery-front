import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delivery-app';

  constructor(private authService: AuthService){
    authService.autoLogin();
    console.log("shtibel")
    console.log("Asd")
  }
}
