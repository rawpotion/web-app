import { Injectable } from '@angular/core';
import {User} from 'firebase';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = new BehaviorSubject<User>(null);

  constructor() { }

  addUser(user: User): void {
    this.user.next(user);
  }

  isLoggedIn(): boolean  {
    return !!this.user.value;
  }
}
