import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass'],
})
export class EditProfileComponent implements OnInit {
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {}

  updateUser(): void {
    this.profileService.saveProfile();
  }
}
