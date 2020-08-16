import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NgxMaterialTimepickerModule,
  NgxMaterialTimepickerTheme,
} from 'ngx-material-timepicker';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
})
export class CreateEventComponent implements OnInit {
  form: FormGroup;
  minDate: Date;
  darkTheme: NgxMaterialTimepickerTheme;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService
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

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.route.params.pipe(first()).subscribe((params) => {
      const { groupId } = params;

      this.userService.user.pipe(first()).subscribe((credentials) => {
        this.userService
          .getUser(credentials.uid)
          .pipe(first())
          .subscribe((user) => {
            if (groupId && user) {
              this.eventService
                .createEvent(
                  {
                    date: new Date(this.date.value).valueOf(),
                    recipe: this.recipe.value,
                    time: this.clock.value,
                    hostId: user.id,
                  },
                  groupId
                )
                .then(() => {
                  this.location.back();
                });
            }
          });
      });
    });
  }
}
