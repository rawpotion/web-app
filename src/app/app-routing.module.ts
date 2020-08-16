import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { GroupsComponent } from './groups/groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { ActiveLinksComponent } from './active-links/active-links.component';
import { JoinGroupComponent } from './join-group/join-group.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { GroupResolverService } from './group-resolver.service';

const routes: Routes = [
  {
    path: 'groups/create',
    component: CreateGroupComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'groups/:groupId/events/create',
    component: CreateEventComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'groups/:groupId/active-links',
    component: ActiveLinksComponent,
    canActivate: [AngularFireAuthGuard],
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
      group: GroupResolverService,
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
  providers: [],
})
export class AppRoutingModule {}
