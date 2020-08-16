import { TestBed } from '@angular/core/testing';

import { UserProfileResolverService } from './user-profile-resolver.service';

describe('UserProfileResolverService', () => {
  let service: UserProfileResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
