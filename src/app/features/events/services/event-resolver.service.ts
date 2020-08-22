import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DinnerEvent, EventService } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class EventResolverService implements Resolve<Observable<DinnerEvent>> {
  constructor(private eventService: EventService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<DinnerEvent>> {
    return of(
      this.eventService.getEvent(route.params.groupId, route.params.eventId)
    );
  }
}
