import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private groups = new BehaviorSubject<Group[]>([]);
  private groups$ = this.groups.asObservable();
  private groupsSubscription: Subscription;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  getGroups(uid: string): Observable<Group[]> {
    if (!this.groupsSubscription) {
      console.debug('fetching groups')
      this.groupsSubscription = this.db
        .collection<Group>('groups', (query) =>
          query.where('members', 'array-contains', uid)
        )
        .valueChanges({ idField: 'id' })
        .subscribe((groups) => {
          console.debug('subscription called');
          this.groups.next(groups);
        });
    }

    return this.groups$;
  }

  getGroup(groupId: string): Observable<Group> {
    return this.groupDocRef(groupId)
      .valueChanges()
      .pipe(map((group) => {
        console.debug("subscription called")
        return ({...group, id: groupId});
      }));
  }

  private groupDocRef(groupId: string): AngularFirestoreDocument<Group> {
    return this.db.collection<Group>('groups').doc<Group>(groupId);
  }

  createGroup(name: string, uid: string): Promise<DocumentReference> {
    return this.db.collection<Group>('groups').add({
      name,
      owner: uid,
      members: [uid],
    });
  }

  addMemberToGroup(groupId: string, userId: string): Promise<void> {
    if (!groupId || !userId) {
      console.error(
        `either group: ${groupId} or userId: ${userId} was invalid`
      );
      return;
    }

    return (this.groupDocRef(groupId) as AngularFirestoreDocument<any>).update({
      members: firebase.firestore.FieldValue.arrayUnion(userId),
    });
  }

  delete(groupId: string): Promise<void> {
    return this.groupDocRef(groupId).delete();
  }
}
