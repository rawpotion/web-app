import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../../models/group';
import { ShareableLinkService } from '../../services/shareable-link.service';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import {
  DinnerEvent,
  EventService,
} from '../../../events/services/event.service';
import { UserService } from '../../../user/services/user.service';
import { User } from 'firebase';
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.sass'],
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  public loading = true;
  public group: Group;
  public events: DinnerEvent[];
  public userId: string;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private linksService: ShareableLinkService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {
        group$: Observable<Group>;
        user$: Observable<User>;
        events$: Observable<DinnerEvent[]>;
      }) => {
        data.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
          this.userId = user.uid;
        });
        data.group$
          .pipe(takeUntil(this.destroyed$))
          .subscribe((group) => (this.group = group));
        data.events$
          .pipe(takeUntil(this.destroyed$))
          .subscribe((events) => (this.events = events));
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  attend(event: DinnerEvent): Promise<void> {
    return this.eventService.setAttending(event.id, this.group.id, this.userId);
  }

  cancelAttend(event: DinnerEvent): Promise<void> {
    return this.eventService.setNotAttending(
      event.id,
      this.group.id,
      this.userId
    );
  }

  delete(event: DinnerEvent): Promise<void> {
    return this.eventService.delete(event.id, this.group.id);
  }

  navigateToEvent(event: DinnerEvent): Promise<boolean> {
    return this.router.navigateByUrl(
      `/groups/${this.group.id}/events/${event.id}`
    );
  }

  isOwner(): boolean {
    return this.userId === this.group.owner;
  }
}
