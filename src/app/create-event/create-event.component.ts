import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { EventService } from '../event.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Group } from '../group';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
})
export class CreateEventComponent implements OnInit {
  form: FormGroup;
  minDate: Date;
  darkTheme: NgxMaterialTimepickerTheme;
  private groupId: string;
  private user: User;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.darkTheme = {
      container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff',
      },
      dial: {
        dialBackgroundColor: '#555',
      },
      clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#fff',
      },
    };

    this.minDate = new Date(Date.now());

    this.form = fb.group({
      recipe: ['', Validators.required],
      date: ['', Validators.required],
      clock: ['18:30', Validators.required],
    });
  }

  get recipe(): AbstractControl {
    return this.form.get('recipe');
  }
  get date(): AbstractControl {
    return this.form.get('date');
  }
  get clock(): AbstractControl {
    return this.form.get('clock');
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { group$: Observable<Group>; user$: Observable<User> }) => {
        data.user$.pipe(first()).subscribe((user) => (this.user = user));
        data.group$
          .pipe(first())
          .subscribe((group) => (this.groupId = group.id));
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.groupId && this.user.uid) {
      this.eventService
        .createEvent(
          {
            date: new Date(this.date.value).valueOf(),
            recipe: this.recipe.value,
            time: this.clock.value,
            hostId: this.user.uid,
          },
          this.groupId
        )
        .then(() => {
          this.location.back();
        });
    }
  }
}
