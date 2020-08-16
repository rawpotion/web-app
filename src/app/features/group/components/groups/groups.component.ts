import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { GroupsService } from '../../services/groups.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit, OnDestroy {
  public loading = true;
  groups: Group[] = [];
  private groupsSubscription: Subscription;

  constructor(
    private groupsService: GroupsService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.auth.user.pipe(first()).subscribe((user) => {
      if (user) {
        this.groupsSubscription = this.groupsService
          .getGroups(user.uid)
          .subscribe((groups) => {
            this.groups = groups;
            this.loading = false;
          });
      } else {
        throw new Error('Could not get user');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }
}
