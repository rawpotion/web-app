import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareableLinkService } from '../../services/shareable-link.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { Group } from '../../models/group';
import { ShareableLink } from '../../models/shareable.link';

@Component({
  selector: 'app-active-links',
  templateUrl: './active-links.component.html',
  styleUrls: ['./active-links.component.sass'],
})
export class ActiveLinksComponent implements OnInit, OnDestroy {
  loading = true;
  links: ShareableLink[] = [];

  private groupId: string;
  private destroyed$ = new ReplaySubject(1);

  constructor(
    private linksService: ShareableLinkService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {
        group$: Observable<Group>;
        links$: Observable<ShareableLink[]>;
      }) => {
        data.links$.pipe(takeUntil(this.destroyed$)).subscribe((links) => {
          this.loading = false;
          return (this.links = links);
        });
        data.group$
          .pipe(takeUntil(this.destroyed$))
          .subscribe((group) => (this.groupId = group.id));
      }
    );
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getLinkAsUrl(link: ShareableLink): string {
    return `${window.location.href}/join/${link.id}`;
  }

  deleteLink(link: ShareableLink): void {
    if (this.groupId) {
      this.linksService.deleteLink(this.groupId, link.id);
    }
  }

  copy(link): string {
    return this.getLinkAsUrl(link);
  }
}
