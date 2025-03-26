import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttireDetailComponent } from './attire-detail.component';

describe('AttireDetailComponent', () => {
  let component: AttireDetailComponent;
  let fixture: ComponentFixture<AttireDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttireDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AttireDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
