import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from './group';
import { catchError, first } from 'rxjs/operators';
import { User } from 'firebase';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.userService.user.pipe(first()).pipe(
      catchError((error) => {
        console.error(error);
        throw new Error(error);
      })
    );
  }
}
