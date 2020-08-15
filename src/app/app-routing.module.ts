import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ProfileComponent} from './profile/profile.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {GroupsComponent} from './groups/groups.component';
import {CreateGroupComponent} from './create-group/create-group.component';

const routes: Routes = [
  {
    path: 'groups/create',
    component: CreateGroupComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard]
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
})
export class AppRoutingModule {}
