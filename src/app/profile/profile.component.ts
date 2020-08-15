import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'firebase';
import { from, Observable, Subscription } from 'rxjs';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: User = null;
  public loading: boolean;

  private userServiceSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService.user.subscribe((user) => {
      this.user = user;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }

  logout(): void {
    from(this.userService.logout()).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
