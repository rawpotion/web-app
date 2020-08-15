import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ShareableLink {
  id?: string;
  created?: string;
  expires?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShareableLinkService {
  constructor(private db: AngularFirestore) {}

  createLink(groupId: string): Promise<DocumentReference> {
    return this.db
      .collection('groups/')
      .doc(groupId)
      .collection<ShareableLink>('links')
      .add({});
  }

  getLinks(groupId: string): Observable<ShareableLink[]> {
    return this.getLinksRef(groupId).valueChanges({ idField: 'id' });
  }

  private getLinksRef(
    groupId: string
  ): AngularFirestoreCollection<DocumentData> {
    return this.db
      .collection<ShareableLink>(`groups`)
      .doc(groupId)
      .collection('links');
  }

  deleteLink(groupId: string, linkId: string): Promise<void> {
    return this.getLinksRef(groupId).doc(linkId).delete();
  }
}
