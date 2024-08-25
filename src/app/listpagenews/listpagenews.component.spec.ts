import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpagenewsComponent } from './listpagenews.component';

describe('ListpagenewsComponent', () => {
  let component: ListpagenewsComponent;
  let fixture: ComponentFixture<ListpagenewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListpagenewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpagenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
