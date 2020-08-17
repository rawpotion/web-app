import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, ReplaySubject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareableLinkService } from '../../services/shareable-link.service';
import { Group } from '../../models/group';
import { User } from 'firebase';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.sass'],
})
export class GroupSettingsComponent implements OnInit, OnDestroy {
  loading = true;
  private destroyed$ = new ReplaySubject(1);
  private group: Group;
  private user: User;

  constructor(
    private route: ActivatedRoute,
    private linksService: ShareableLinkService,
    private groupService: GroupsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { group$: Observable<Group>; user$: Observable<User> }) => {
        data.group$.pipe(takeUntil(this.destroyed$)).subscribe((group) => {
          this.loading = false;
          console.log(this.loading);
          this.group = group;
        });
        data.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
          return (this.user = user);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  createShareableLink(): void {
    from(this.linksService.createLink(this.group.id))
      .pipe(first())
      .subscribe((link) => {
        if (link) {
          alert(`${window.location.host}/groups/${this.group.id}/join/${link.id}`);
        }
      });
  }

  deleteGroup(): void {
    this.groupService
      .delete(this.group.id)
      .then(() => this.router.navigateByUrl('/groups'));
  }
}
