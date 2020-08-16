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
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { GroupsComponent } from './groups/groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { DisplayNameComponent } from './display-name/display-name.component';
import { ActiveLinksComponent } from './active-links/active-links.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JoinGroupComponent } from './join-group/join-group.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AttendingMembersComponent } from './attending-members/attending-members.component';

console.log(environment);

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
