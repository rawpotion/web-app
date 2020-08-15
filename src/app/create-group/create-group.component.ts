import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GroupsService } from '../groups.service';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { User } from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.sass'],
})
export class CreateGroupComponent implements OnInit {
  private user: User;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private groupsService: GroupsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      groupName: ['', Validators.required],
    });

    this.userService.user.pipe(first()).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    if (!this.form.valid) {
      console.error(this.form.errors);
    }

    from(
      this.groupsService.createGroup(
        this.form.get('groupName').value,
        this.user.uid
      )
    )
      .pipe(first())
      .subscribe((group) => {
        if (group) {
          this.router.navigateByUrl(`/groups/${group.id}`);
        } else {
          this.resetForm();
        }
      });
  }

  resetForm(): void {
    this.form.reset();
  }

  onSubmit(form: FormGroup): void {
    this.submit();
  }
}
