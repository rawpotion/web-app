import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { GroupsService } from '../groups.service';
import { Group } from '../group';
import { ShareableLinkService } from '../shareable-link.service';
import { first } from 'rxjs/operators';
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
  public groupId: string;
  public userId: string;

  private eventsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private linksService: ShareableLinkService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { group: Group; user: User }) => {
      this.userId = data.user.uid;
      this.groupId = data.group.id;

      this.loading = false;
      if (this.eventsSubscription) {
        this.eventsSubscription.unsubscribe();
      }
      this.eventsSubscription = this.eventService
        .getFutureEvents(this.groupId)
        .subscribe((events) => {
          return (this.events = events);
        });

      return (this.group = data.group);
    });
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  createShareableLink(): void {
    from(this.linksService.createLink(this.groupId))
      .pipe(first())
      .subscribe((link) => {
        if (link) {
          alert(`${window.location.href}/join/${link.id}`);
        }
      });
  }

  attend(event: DinnerEvent): Promise<void> {
    return this.eventService.setAttending(event.id, this.groupId, this.userId);
  }

  cancelAttend(event: DinnerEvent): Promise<void> {
    return this.eventService.setNotAttending(
      event.id,
      this.groupId,
      this.userId
    );
  }

  delete(event: DinnerEvent): Promise<void> {
    return this.eventService.delete(event.id, this.groupId);
  }
}
