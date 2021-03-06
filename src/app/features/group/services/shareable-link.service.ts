import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShareableLink } from '../models/shareable.link';

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

  getLink(groupId: string, linkSlug: string): Observable<ShareableLink> {
    return this.getLinksRef(groupId)
      .doc<ShareableLink>(linkSlug)
      .valueChanges()
      .pipe(
        map((link) => {
          if (!link) {
            return null;
          }
          return { ...link, id: linkSlug } as ShareableLink;
        })
      );
  }
}
