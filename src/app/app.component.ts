import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth as firebaseAuth, User } from 'firebase/app';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  public loading = true;
  loggedIn = false;
  user: User = null;

  private authStateSubscription: Subscription;
  private userServiceSubscription: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService
  ) {}

  login(): void {
    this.auth
      .signInWithPopup(new firebaseAuth.GoogleAuthProvider())
      .then((credentials) => {
        if (!environment.production) {
          this.userService.createUser(credentials.user);
        }
      });
  }

  logout(): void {
    this.auth.signOut();
  }

  ngOnInit(): void {
    this.authStateSubscription = this.auth.authState.subscribe(
      (credentials) => {
        this.userService.addUser(credentials);

        if (this.userServiceSubscription) {
          this.userServiceSubscription.unsubscribe();
        }
        this.userServiceSubscription = this.userService.user.subscribe(
          (user) => {
            this.user = user;
            this.loggedIn = this.userService.isLoggedIn();
            this.loading = false;
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
    this.userServiceSubscription.unsubscribe();
  }
}
