import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { UserService } from '../../user/services/user.service';
import { EventComment } from '../models/eventComment';
import { from, Observable, ObservedValueOf, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

  getComments(eventId: string): Observable<EventComment[]> {
    return this.db
      .collection<EventComment>('/comments', (query) =>
        query.where('eventId', '==', eventId).orderBy('timestamp')
      )
      .valueChanges({ idField: 'id' });
  }

  getComment(commentId: string): Observable<EventComment> {
    return this.db
      .collection('/comments')
      .doc<EventComment>(commentId)
      .valueChanges()
      .pipe(map((comment) => ({ ...comment, id: commentId })));
  }

  addComment(
    eventComment: EventComment
  ): Observable<ObservedValueOf<Promise<DocumentReference>>> {
    console.debug('Adding comment');
    return from(
      this.db.collection<EventComment>('/comments').add(eventComment)
    );
  }
}
