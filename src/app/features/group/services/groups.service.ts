import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  getGroups(uid: string): Observable<Group[]> {
    return this.db
      .collection<Group>('groups', (query) =>
        query.where('members', 'array-contains', uid)
      )
      .valueChanges({ idField: 'id' });
  }

  getGroup(groupId: string): Observable<Group> {
    return this.groupDocRef(groupId)
      .valueChanges()
      .pipe(map((group) => ({ ...group, id: groupId })));
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
}
