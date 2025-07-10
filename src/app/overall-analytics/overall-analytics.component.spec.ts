import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAnalyticsComponent } from './overall-analytics.component';

describe('OverallAnalyticsComponent', () => {
  let component: OverallAnalyticsComponent;
  let fixture: ComponentFixture<OverallAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
