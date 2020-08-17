import { Component, OnInit } from '@angular/core';
import { from, Observable, ReplaySubject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { UserService } from '../../../user/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService, UserSettings } from '../../services/settings.service';
import { User } from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  loading = true;
  settings: UserSettings;
  private destroyed$ = new ReplaySubject(1);
  private user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {
        settings$: Observable<UserSettings>;
        user$: Observable<User>;
      }) => {
        data.settings$
          .pipe(takeUntil(this.destroyed$))
          .subscribe((settings) => {
            this.loading = false;
            this.settings = settings ?? new UserSettings();
          });
        data.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
          this.user = user;
        });
      }
    );
  }
  logout(): void {
    from(this.userService.logout())
      .pipe(first())
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  saveSettings(): Promise<void> {
    return this.settingsService
      .setSettings(this.user.uid, this.settings)
      .then(() => {
        this.router.navigateByUrl('/');
      });
  }
}
