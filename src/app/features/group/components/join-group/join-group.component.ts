import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { ShareableLinkService } from '../../services/shareable-link.service';
import { GroupsService } from '../../services/groups.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subscription } from 'rxjs';
import { UserService } from '../../../user/services/user.service';
import { first, takeUntil } from 'rxjs/operators';
import { ShareableLink } from '../../models/shareable.link';
import { auth as firebaseAuth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.sass'],
})
export class JoinGroupComponent implements OnInit, OnDestroy {
  public user: User;
  public loading = true;
  group: Group;
  link: ShareableLink;

  private destroyed$ = new ReplaySubject(1);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private linkService: ShareableLinkService,
    private location: Location,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.user = user;
      });

    this.route.params.subscribe((params) => {
      const { groupId, linkSlug } = params;
      this.groupService
        .getGroup(groupId)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((group) => {
          this.loading = false;
          this.group = group;
        });

      this.linkService
        .getLink(groupId, linkSlug)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((link) => (this.link = link));
    });
  }

  join(): void {
    if (this.user) {
      if (!this.group.members.find((member) => member === this.user.uid)) {
        console.log(this.group);
        this.groupService.addMemberToGroup(
          this.group.id,
          this.user.uid,
          this.link.id
        );
      }
    }
  }

  cancel(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
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
  loginWithGoogle(): void {
    if (this.iOS()) {
      this.auth.signInWithRedirect(new firebaseAuth.GoogleAuthProvider());
    } else {
      this.auth
        .signInWithPopup(new firebaseAuth.GoogleAuthProvider())
        .then((credentials) => {
          this.userService.addUser(credentials.user);
        });
    }
  }
}
