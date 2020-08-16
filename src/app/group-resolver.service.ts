import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Group } from './group';
import { Observable } from 'rxjs';
import { GroupsService } from './groups.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService implements Resolve<Group> {
  constructor(private groupService: GroupsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Group> {
    const groupId = route.paramMap.get('groupId');
    return this.groupService.getGroup(groupId).pipe(
      first(),
      catchError((error) => {
        console.error(error);
        throw new Error('GroupId was not found' + error);
      })
    );
  }
}
