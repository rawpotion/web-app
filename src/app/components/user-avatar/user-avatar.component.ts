import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  StoredUser,
  UserService,
} from '../../features/user/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';
import { ProfileService } from '../../features/profile/services/profile.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.sass'],
})
export class UserAvatarComponent implements OnInit, OnDestroy {
  @Input() userId: string;

  user: StoredUser;
  private userSubscription: Subscription;
  public loading = true;

  constructor(
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService
      .getUser(this.userId)
      .subscribe((user) => {
        if (user) {
          console.debug('updating user');
          this.user = user;
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
