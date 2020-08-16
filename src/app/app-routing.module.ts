import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './features/profile/components/profile/profile.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { GroupsComponent } from './features/group/components/groups/groups.component';
import { CreateGroupComponent } from './features/group/components/create-group/create-group.component';
import { GroupDetailsComponent } from './features/group/components/group-details/group-details.component';
import { ActiveLinksComponent } from './features/group/components/active-links/active-links.component';
import { JoinGroupComponent } from './features/group/components/join-group/join-group.component';
import { CreateEventComponent } from './features/events/components/create-event/create-event.component';
import { GroupResolverService } from './group-resolver.service';
import { UserResolverService } from './user-resolver.service';
import { EventsResolverService } from './events-resolver.service';
import { LinksResolverService } from './links-resolver.service';

const routes: Routes = [
  {
    path: 'groups/create',
    component: CreateGroupComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      user$: UserResolverService,
    },
  },
  {
    path: 'groups/:groupId/events/create',
    component: CreateEventComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      group$: GroupResolverService,
      user$: UserResolverService,
    },
  },
  {
    path: 'groups/:groupId/active-links',
    component: ActiveLinksComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      group$: GroupResolverService,
      links$: LinksResolverService,
    },
  },
  {
    path: 'groups/:groupId/join/:linkSlug',
    component: JoinGroupComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'groups/:groupId',
    component: GroupDetailsComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      group$: GroupResolverService,
      user$: UserResolverService,
      events$: EventsResolverService,
    },
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    UserResolverService,
    GroupResolverService,
    EventsResolverService,
    LinksResolverService,
  ],
})
export class AppRoutingModule {}
