import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  checkAuthorization(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.userService.getAuthenticated().then(user => {
        if (user == null) {
          this.router.navigate(['login']).then(() => {
            console.debug('User is not authorized. Redirect to login page (redirect service)');
            resolve(true);
          })
          return;
        }
        resolve(false);
      });
    });
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]).then(() => console.debug('Reload current route: ' + currentUrl));
    });
  }
}
