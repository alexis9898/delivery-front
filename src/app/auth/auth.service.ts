import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { Roles } from '../core/enums/roles.enum';
import { AppUser } from '../core/models/app-user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userChain = new BehaviorSubject<AppUser | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // url = `https://jltrinpj51.execute-api.eu-north-1.amazonaws.com/Prod/Account`
  url = `${environment.baseApiUrl}/api/Account`;

  login(username: string, password: string) {
    return this.http
      .post<AppUser>(`${this.url}/login`, { username, password })
      .pipe(
        tap((user) => {
          if (user) {
            this.handleAuth(user);
          }
        }),
        catchError((error) => this.handleAccountsError(error))
      );
  }

  // createInstaller(installer: InstallerDto, password: string) {

  //   return this.http.post<{ message:string }>(`${this.url}/signup`, {...installer, password: password,role: Roles.installer})
  //     .pipe(tap(res =>
  //       this.workersService.getInstallers()
  //     ),
  //       catchError(err => this.handleAccountsError(err))
  //     )
  // }

  // createManager(manager: ManagerDto, password: string) {
  //   return this.http.post<{ message: string }>(`${this.url}/signup`, {...manager, password ,role: Roles.manager})
  //     .pipe(
  //       catchError(err => this.handleAccountsError(err))
  //     )
  // }

  logout() {
    localStorage.removeItem('user');
    this.userChain.next(null);
    this.router.navigate(['auth']);
  }

  autoLogin() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson) as AppUser;
      this.userChain.next(user);
    }
  }

  handleAuth(user: AppUser) {
    this.userChain.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  handleAccountsError(error: HttpErrorResponse) {
    let errMessage = 'בקשה שגויה! אם בעיה זו חוזרת התקשרו 0523452554';
    console.log(error)

    if (!error.error || !error.error.message) {
      return throwError(errMessage);
    }
    switch (error.error.message) {
      case 'FAILED_LOGIN':
        errMessage = 'שם משתמש או סיסמא שגויים';
        break;
      case 'FAILED_SIGNUP':
        errMessage = 'שגיאה! לא ניתן להוסיף משתמש';
    }
    return throwError(errMessage);
  }
}

interface signUp {
  name: string;
  password: string;
  phone: string;
  role: string;
  email?: string;
}
