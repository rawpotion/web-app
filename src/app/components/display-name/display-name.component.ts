import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StoredUser, UserService } from '../../user.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-display-name',
  templateUrl: './display-name.component.html',
  styleUrls: ['./display-name.component.sass'],
})
export class DisplayNameComponent implements OnInit, OnDestroy {
  @Input() userId: string;

  user: StoredUser;
  private userSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService
      .getUser(this.userId)
      .subscribe((user) => {
        if (user) {
          this.user = user;
        } else {
          console.error(`user not found for = ${this.userId}`);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
