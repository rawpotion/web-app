import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { BehaviorSubject, from, Observable, ObservedValueOf } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user = new BehaviorSubject<User>(null);

  constructor(private auth: AngularFireAuth) {}

  addUser(user: User): void {
    this.user.next(user);
  }

  isLoggedIn(): boolean {
    return !!this.user.value;
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }
}
