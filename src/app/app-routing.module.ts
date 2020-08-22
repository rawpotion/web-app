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
import { GroupResolverService } from './features/group/services/group-resolver.service';
import { UserResolverService } from './features/profile/services/user-resolver.service';
import { EventsResolverService } from './features/events/services/events-resolver.service';
import { LinksResolverService } from './features/group/services/links-resolver.service';
import { SettingsComponent } from './features/settings/components/settings/settings.component';
import { GroupSettingsComponent } from './features/group/components/group-settings/group-settings.component';
import { SettingsResolverService } from './features/settings/services/settings-resolver.service';
import { EventDetailsComponent } from './features/events/components/event-details/event-details.component';
import { EventResolverService } from './features/events/services/event-resolver.service';
import { CommentsResolverService } from './features/comments/services/comments-resolver.service';
import { EditProfileComponent } from './features/profile/components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      user$: UserResolverService,
      settings$: SettingsResolverService,
    },
  },
  {
    path: 'groups/create',
    component: CreateGroupComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      user$: UserResolverService,
    },
  },
  {
    path: 'groups/:groupId/settings',
    component: GroupSettingsComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      group$: GroupResolverService,
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
    path: 'groups/:groupId/events/:eventId',
    component: EventDetailsComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: {
      group$: GroupResolverService,
      user$: UserResolverService,
      event$: EventResolverService,
      comments$: CommentsResolverService,
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
    path: 'profile/edit',
    component: EditProfileComponent,
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
