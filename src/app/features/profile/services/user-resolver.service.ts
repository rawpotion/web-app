import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { User } from 'firebase';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService implements Resolve<Observable<User>> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<User>> {
    return of(
      this.userService.user.pipe(first()).pipe(
        catchError((error) => {
          console.error(error);
          throw new Error(error);
        })
      )
    );
  }
}
