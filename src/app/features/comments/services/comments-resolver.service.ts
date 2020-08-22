import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventComment } from '../models/eventComment';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsResolverService
  implements Resolve<Observable<EventComment[]>> {
  constructor(private commentService: CommentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<EventComment[]>> {
    const { eventId } = route.params;
    return of(this.commentService.getComments(eventId));
  }
}
