import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Group } from './group';
import { Observable, of } from 'rxjs';
import { GroupsService } from './groups.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService implements Resolve<Observable<Group>> {
  constructor(private groupService: GroupsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<Group>> {
    const groupId = route.paramMap.get('groupId');
    return of(
      this.groupService.getGroup(groupId).pipe(
        catchError((error) => {
          console.error(error);
          throw new Error('GroupId was not found' + error);
        })
      )
    );
  }
}
