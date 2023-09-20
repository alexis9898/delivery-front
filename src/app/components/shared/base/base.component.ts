import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/core/models/app-user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  protected user: AppUser;

  constructor(private authService: AuthService) {
    this.authService.userChain.subscribe((u) => {
      this.user = u;
    });
  }
}
