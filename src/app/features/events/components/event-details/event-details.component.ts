import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { DinnerEvent } from '../../services/event.service';
import { first, takeUntil } from 'rxjs/operators';
import { EventComment } from '../../../comments/models/eventComment';
import { CommentService } from '../../../comments/services/comment.service';
import { User } from 'firebase';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.sass'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  loading = true;
  private destroyed$ = new ReplaySubject<boolean>(1);
  event: DinnerEvent;
  comments: EventComment[];
  userComment = '';
  private user: User;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {
        event$: Observable<DinnerEvent>;
        comments$: Observable<EventComment[]>;
        user$: Observable<User>;
      }) => {
        data.event$.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
          this.event = event;
          this.loading = false;
        });

        data.comments$
          .pipe(takeUntil(this.destroyed$))
          .subscribe((comments) => {
            console.debug('Updating comments');
            this.comments = comments;
          });

        data.user$
          .pipe(takeUntil(this.destroyed$))
          .subscribe((user) => (this.user = user));
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  sendComment(): void {
    if (!this.userComment) {
      return;
    }
    this.commentService
      .addComment({
        content: this.userComment,
        eventId: this.event.id,
        senderId: this.user.uid,
        timestamp: Date.now(),
      })
      .pipe(first())
      .subscribe(() => {
        this.userComment = '';
      });
  }

  setComment(event: any): void {
    this.userComment = event.value;
  }
}
