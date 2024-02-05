import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizedPageComponent } from './not-authorized-page.component';

describe('NotAuthorizedPageComponent', () => {
  let component: NotAuthorizedPageComponent;
  let fixture: ComponentFixture<NotAuthorizedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAuthorizedPageComponent]
    });
    fixture = TestBed.createComponent(NotAuthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
