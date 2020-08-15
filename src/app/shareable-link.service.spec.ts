import { TestBed } from '@angular/core/testing';

import { ShareableLinkService } from './shareable-link.service';

describe('ShareableLinkService', () => {
  let service: ShareableLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareableLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
