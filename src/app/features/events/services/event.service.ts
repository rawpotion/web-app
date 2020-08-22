import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData,
  DocumentReference,
} from '@angular/fire/firestore';
import { Group } from '../../group/models/group';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class DinnerEvent {
  id?: string;
  hostId: string;
  recipe: string;
  date: number;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private db: AngularFirestore) {}

  createEvent(event: DinnerEvent, groupId: string): Promise<DocumentReference> {
    return this.getGroupDocRef(groupId)
      .collection<DinnerEvent>('events')
      .add(event);
  }

  private getGroupDocRef(groupId: string): AngularFirestoreDocument<Group> {
    return this.db.collection('groups').doc(groupId);
  }

  getFutureEvents(groupId: string): Observable<DinnerEvent[]> {
    return this.getGroupDocRef(groupId)
      .collection<DinnerEvent>('events', (query) =>
        query.where(
          'date',
          '>',
          new Date(Date.now() - 24 * 60 * 60 * 1000).valueOf()
        )
      )
      .valueChanges({ idField: 'id' });
  }

  setAttending(
    eventId: string,
    groupId: string,
    userId: string
  ): Promise<void> {
    return this.getGroupDocRef(groupId)
      .collection<DinnerEvent>('events')
      .doc(eventId)
      .collection('attending')
      .doc(userId)
      .set({});
  }

  setNotAttending(
    eventId: string,
    groupId: string,
    userId: string
  ): Promise<void> {
    return this.getGroupDocRef(groupId)
      .collection('events')
      .doc(eventId)
      .collection('attending')
      .doc(userId)
      .delete();
  }

  getAttendees(eventId: string, groupId: string): Observable<DocumentData[]> {
    return this.getGroupDocRef(groupId)
      .collection('events')
      .doc(eventId)
      .collection('attending')
      .valueChanges({ idField: 'id' });
  }

  delete(eventId: string, groupId: string): Promise<void> {
    return this.getGroupDocRef(groupId)
      .collection('events')
      .doc(eventId)
      .delete();
  }

  getEvent(groupId: string, eventId: string): Observable<DinnerEvent> {
    return this.getGroupDocRef(groupId)
      .collection('events')
      .doc<DinnerEvent>(eventId)
      .valueChanges()
      .pipe(
        map((event) => {
          return { ...event, id: eventId };
        })
      );
  }
}
