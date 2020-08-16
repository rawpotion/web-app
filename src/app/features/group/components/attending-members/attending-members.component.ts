import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../../../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attending-members',
  templateUrl: './attending-members.component.html',
  styleUrls: ['./attending-members.component.sass'],
})
export class AttendingMembersComponent implements OnInit, OnDestroy {
  @Input() groupId: string;
  @Input() eventId: string;

  public attendees: string[] = [];
  private eventSubscription: Subscription;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    if (!this.groupId) {
      throw new Error('GroupId was invalid');
    }
    if (!this.eventId) {
      throw new Error('EventId was invalid');
    }

    this.eventSubscription = this.eventService
      .getAttendees(this.eventId, this.groupId)
      .subscribe((attendees) => {
        this.attendees = attendees.map<string>((attendee) => attendee.id);
      });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
