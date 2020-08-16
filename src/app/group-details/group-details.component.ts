import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable, ReplaySubject, Subscription } from 'rxjs';
import { GroupsService } from '../groups.service';
import { Group } from '../group';
import { ShareableLinkService } from '../shareable-link.service';
import { first, takeUntil } from 'rxjs/operators';
import { DinnerEvent, EventService } from '../event.service';
import { UserService } from '../user.service';
import { User } from 'firebase';

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
    private eventService: EventService
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

  createShareableLink(): void {
    from(this.linksService.createLink(this.group.id))
      .pipe(first())
      .subscribe((link) => {
        if (link) {
          alert(`${window.location.href}/join/${link.id}`);
        }
      });
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
}
