import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DinnerEvent, EventService } from './event.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsResolverService
  implements Resolve<Observable<DinnerEvent[]>> {
  constructor(private eventService: EventService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<DinnerEvent[]>> {
    const groupId = route.paramMap.get('groupId');
    return of(this.eventService.getFutureEvents(groupId));
  }
}
