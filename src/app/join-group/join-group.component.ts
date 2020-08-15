import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../group';
import { ShareableLink, ShareableLinkService } from '../shareable-link.service';
import { GroupsService } from '../groups.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.sass'],
})
export class JoinGroupComponent implements OnInit, OnDestroy {
  loading = true;
  group: Group;
  link: ShareableLink;

  private paramsSubscription: Subscription;
  private groupSubscription: Subscription;
  private linkSubscription: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private linkService: ShareableLinkService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      const { groupId, linkSlug } = params;
      if (this.groupSubscription) {
        this.groupSubscription.unsubscribe();
      }
      this.groupSubscription = this.groupService
        .getGroup(groupId)
        .subscribe((group) => {
          this.loading = false;
          this.group = group;
        });

      if (this.linkSubscription) {
        this.linkSubscription.unsubscribe();
      }
      this.linkSubscription = this.linkService
        .getLink(groupId, linkSlug)
        .subscribe((link) => (this.link = link));
    });
  }

  join(): void {
    this.userService.user.pipe(first()).subscribe((user) => {
      if (user) {
        if (!this.group.members.find((member) => member === user.uid)) {
          console.log(this.group);
          this.groupService.addMemberToGroup(this.group.id, user.uid);
        }
      }
    });
  }

  cancel(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
    this.linkSubscription.unsubscribe();
  }
}
