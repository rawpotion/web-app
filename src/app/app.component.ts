import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth as firebaseAuth, User} from 'firebase/app';
import {Subscription} from 'rxjs';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy{
  loggedIn = false;
  user: User = null;

  private authStateSubscription: Subscription;
  private userServiceSubscription: Subscription;

  constructor(private auth: AngularFireAuth, private userService: UserService) {
  }

  login(): void {
    this.auth.signInWithPopup(new firebaseAuth.GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut();
  }

  ngOnInit(): void {
    this.authStateSubscription =  this.auth.authState.subscribe(user => {
      this.userService.addUser(user);
    });
    this.userServiceSubscription = this.userService.user.subscribe(user => {
      this.user = user;
      this.loggedIn = this.userService.isLoggedIn();
    });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
    this.userServiceSubscription.unsubscribe();
  }
}
