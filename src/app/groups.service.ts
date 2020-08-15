import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Group } from './group';
import {switchMap} from 'rxjs/operators';

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
    return this.db
      .collection<Group>('groups')
      .doc<Group>(groupId)
      .valueChanges();
  }

  createGroup(name: string, uid: string): Promise<DocumentReference> {
    return this.db.collection<Group>('groups').add({
      name,
      owner: uid,
      members: [uid],
    });
  }
}
