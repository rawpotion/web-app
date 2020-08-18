import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth as firebaseAuth, User } from 'firebase/app';
import { Subscription } from 'rxjs';
import { UserService } from './features/user/services/user.service';
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

  iOS(): boolean {
    return (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
  }

  login(): void {
    if (this.iOS()) {
      console.log('Is iOS');
      this.auth.signInWithRedirect(new firebaseAuth.GoogleAuthProvider());
    } else {
      this.auth
        .signInWithPopup(new firebaseAuth.GoogleAuthProvider())
        .then((credentials) => {
          if (!environment.production) {
            this.userService.createUser(credentials.user);
          }
        })
        .catch((e) => console.error(e));
    }
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
        this.userServiceSubscription = this.userService.getCurrentUser().subscribe(
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
