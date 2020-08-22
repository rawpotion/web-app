import { TestBed } from '@angular/core/testing';

import { CommentsResolverService } from './comments-resolver.service';

describe('CommentsResolverService', () => {
  let service: CommentsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
