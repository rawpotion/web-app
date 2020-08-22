import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoredUser, UserService } from '../../user/services/user.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

  saveProfile(): void {
    this.userService
      .getCurrentUser()
      .pipe(first())
      .subscribe((user) => {
        if (!user) {
          console.debug('aborting no authenticatedUser');
          return;
        }
        this.userService
          .getUser(user.uid)
          .pipe(first())
          .subscribe((storedUser) => {
            if (!storedUser) {
              console.debug('aborting no storedUser');
              return;
            }

            console.debug('updating profile');
            this.db
              .collection<StoredUser>('/users')
              .doc<StoredUser>(user.uid)
              .set({
                ...storedUser,
                photoUrl: user.photoURL,
              });
          });
      });
  }
}
