import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SettingsService, UserSettings } from './settings.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class SettingsResolverService
  implements Resolve<Observable<UserSettings>> {
  constructor(
    private auth: AngularFireAuth,
    private settings: SettingsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<UserSettings>> {
    return of(
      this.auth.user.pipe(
        switchMap<User, Observable<UserSettings>>((user) => {
          return this.settings.getSettings(user.uid);
        })
      )
    );
  }
}
