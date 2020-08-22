import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StylingModule } from './styling/styling.module';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './features/profile/components/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { GroupsComponent } from './features/group/components/groups/groups.component';
import { CreateGroupComponent } from './features/group/components/create-group/create-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupDetailsComponent } from './features/group/components/group-details/group-details.component';
import { DisplayNameComponent } from './components/display-name/display-name.component';
import { ActiveLinksComponent } from './features/group/components/active-links/active-links.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JoinGroupComponent } from './features/group/components/join-group/join-group.component';
import { CreateEventComponent } from './features/events/components/create-event/create-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AttendingMembersComponent } from './features/group/components/attending-members/attending-members.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsComponent } from './features/settings/components/settings/settings.component';
import { GroupSettingsComponent } from './features/group/components/group-settings/group-settings.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EventDetailsComponent } from './features/events/components/event-details/event-details.component';
import { CommentComponent } from './features/comments/components/comment/comment.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

console.log(environment.production);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    GroupsComponent,
    CreateGroupComponent,
    GroupDetailsComponent,
    DisplayNameComponent,
    ActiveLinksComponent,
    JoinGroupComponent,
    CreateEventComponent,
    AttendingMembersComponent,
    SettingsComponent,
    GroupSettingsComponent,
    EventDetailsComponent,
    CommentComponent,
    UserAvatarComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StylingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ClipboardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatDividerModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
  ],
  providers: [
    {
      provide: SETTINGS,
      useFactory: () =>
        environment.production ? {} : { host: 'localhost:4301', ssl: false },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
