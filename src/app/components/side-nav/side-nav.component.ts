import { MediaMatcher } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AppUser } from 'src/app/core/models/app-user.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  user: AppUser;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authService.userChain.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.router.navigate(['auth']);
      }
      this.user = user;
    });
    console.log(this.user);
  }

  // openManageDialog() {
  //   this.dialog.open(ManageAssignmentComponent)
  // }

  // onCreateManager() {
  //   this.dialog.open(CreateInstallerComponent, {data: false})
  // }

  // onGetProducts() {
  //   this.producsService.getProducts();
  // }

  onLogout() {
    this.authService.logout();
  }

  // ngOnDestroy(): void {
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }
}
