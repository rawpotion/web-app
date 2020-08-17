import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export class UserSettings {
  autoAttend: boolean = false;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private db: AngularFirestore) {}

  setSettings(
    userId: string,
    settings: UserSettings = new UserSettings()
  ): Promise<void> {
    if (!settings) {
      console.error('settings is undefined');
      return;
    }
    return this.db
      .collection<UserSettings>('userSettings')
      .doc<UserSettings>(userId)
      .set({...settings});
  }

  getSettings(userId: string): Observable<UserSettings> {
    return this.db
      .collection('userSettings')
      .doc<UserSettings>(userId)
      .valueChanges();
  }
}
