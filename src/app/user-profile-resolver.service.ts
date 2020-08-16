import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StoredUser, UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileResolverService
  implements Resolve<Observable<StoredUser>> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Observable<StoredUser>>
    | Promise<Observable<StoredUser>>
    | Observable<StoredUser> {
    return of(this.userService.getUser(route.paramMap.get('profileId')));
  }
}
