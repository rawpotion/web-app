import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLinksComponent } from './active-links.component';

describe('ActiveLinksComponent', () => {
  let component: ActiveLinksComponent;
  let fixture: ComponentFixture<ActiveLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
