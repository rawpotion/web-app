import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export class StoredUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

class StoredUsersState {
  userId: string;
  storedUser: BehaviorSubject<StoredUser>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: StoredUsersState[] = [];

  private user = new BehaviorSubject<User>(null);
  private storedUser = new BehaviorSubject<StoredUser>(null);
  storedUser$ = this.storedUser.asObservable();
  private storedUserSubscription: Subscription;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    auth.user.subscribe((user) => {
      this.user.next(user);
    });
  }

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

  getCurrentStoredUser(): Observable<StoredUser> {
    if (!this.storedUserSubscription) {
      this.storedUserSubscription = this.db
        .collection<StoredUser>('users')
        .doc<StoredUser>(this.user.value.uid)
        .valueChanges()
        .pipe(
          map((user) => {
            return {
              ...user,
              id: this.user.value.uid,
            } as StoredUser;
          })
        )
        .subscribe((user) => {
          this.storedUser.next(user);
        });
    }

    return this.storedUser$;
  }

  getCurrentUser(): Observable<User> {
    return this.user.asObservable();
  }

  getUser(userId: string): Observable<StoredUser> {
    console.debug('getting user with = ' + userId);

    const storedUsersState = this.users.find((u) => u.userId === userId);
    if (storedUsersState) {
      console.debug('found in cache returning');
      return storedUsersState.storedUser.asObservable();
    } else {
      return this.FetchUserAndAddToCache(userId);
    }
  }

  private FetchUserAndAddToCache(userId: string): Observable<StoredUser> {
    console.debug('fetching from firestore');

    const behaviorUser = new BehaviorSubject<StoredUser>(null);
    this.db
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
      )
      .pipe(
        map((user) => {
          console.debug('subscription called = ' + user.id);
          return user;
        })
      )
      .subscribe((user) => behaviorUser.next(user));

    const newStoredUserState: StoredUsersState = {
      userId,
      storedUser: behaviorUser,
    };
    this.users.push(newStoredUserState);

    return behaviorUser.asObservable();
  }
}
