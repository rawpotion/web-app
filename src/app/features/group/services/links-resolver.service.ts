import { Injectable } from '@angular/core';
import { ShareableLinkService } from './shareable-link.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShareableLink } from '../models/shareable.link';

@Injectable({
  providedIn: 'root',
})
export class LinksResolverService
  implements Resolve<Observable<ShareableLink[]>> {
  constructor(private linksService: ShareableLinkService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<ShareableLink[]>> {
    const groupId = route.paramMap.get('groupId');
    return of(this.linksService.getLinks(groupId));
  }
}
