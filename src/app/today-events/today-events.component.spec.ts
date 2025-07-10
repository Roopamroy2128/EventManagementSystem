import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayEventsComponent } from './today-events.component';

describe('TodayEventsComponent', () => {
  let component: TodayEventsComponent;
  let fixture: ComponentFixture<TodayEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
