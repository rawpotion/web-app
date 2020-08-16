import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { debounce, map, switchMap } from 'rxjs/operators';

export class StoredUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user = new BehaviorSubject<User>(null);

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  addUser(user: User): void {
    this.user.next(user);
  }

  isLoggedIn(): boolean {
    return !!this.user.value;
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }

  createUser(user: User): Promise<void> {
    return this.db.collection('users').doc(user.uid).set({
      name: user.displayName,
      createdAt: user.metadata.creationTime,
      email: user.email,
    });
  }

  getUser(userId: string): Observable<StoredUser> {
    return this.db
      .collection<StoredUser>('users')
      .doc<StoredUser>(userId)
      .valueChanges()
      .pipe(
        map((user) => {
          return {
            ...user,
            id: userId,
          } as StoredUser;
        })
      );
  }
}
