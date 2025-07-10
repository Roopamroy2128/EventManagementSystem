
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewEventComponent } from './view-event.component';
import { By } from '@angular/platform-browser';

describe('ViewEventComponent', () => {
  let component: ViewEventComponent;
  let fixture: ComponentFixture<ViewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 attendees initially', () => {
    expect(component.attendees.length).toBe(4);
  });

  it('should delete an attendee', () => {
    component.deleteAttendee(1125);
    fixture.detectChanges();
    expect(component.attendees.length).toBe(3);
    expect(component.attendees.find(a => a.id === 1125)).toBeUndefined();
  });

  it('should change the current page on goToPage', () => {
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
  });

  it('should render attendee rows in table', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(4);
  });
});