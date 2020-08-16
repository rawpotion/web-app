import { TestBed } from '@angular/core/testing';

import { LinksResolverService } from './links-resolver.service';

describe('LinksResolverService', () => {
  let service: LinksResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinksResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
