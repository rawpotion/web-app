import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareableLink, ShareableLinkService } from '../shareable-link.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active-links',
  templateUrl: './active-links.component.html',
  styleUrls: ['./active-links.component.sass'],
})
export class ActiveLinksComponent implements OnInit, OnDestroy {
  loading = true;
  links: ShareableLink[] = [];
  private linksSubscription: Subscription;
  private groupId: string;

  constructor(
    private linksService: ShareableLinkService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe((params) => {
      this.groupId = params.groupId;
      this.linksSubscription = this.linksService
        .getLinks(params.groupId)
        .subscribe((links) => {
          this.loading = false;
          return (this.links = links);
        });
    });
  }

  getLinkAsUrl(link: ShareableLink): string {
    return `${window.location.href}/join/${link.id}`;
  }

  ngOnDestroy(): void {
    this.linksSubscription.unsubscribe();
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
