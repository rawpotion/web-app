import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { GroupsService } from '../groups.service';
import { Group } from '../group';
import { ShareableLinkService } from '../shareable-link.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.sass'],
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  public loading = true;
  public group: Group;

  private groupId: string;

  private routeSubscription: Subscription;
  private groupsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private linksService: ShareableLinkService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.loading = true;
      this.groupId = params.groupId;
      this.groupsSubscription = this.groupsService
        .getGroup(this.groupId)
        .subscribe((group) => {
          if (group) {
            this.group = {
              ...group,
              id: this.groupId,
            };
          } else {
            throw new Error(`Group was not found, group = ${this.groupId}`);
          }

          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.groupsSubscription.unsubscribe();
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
}
