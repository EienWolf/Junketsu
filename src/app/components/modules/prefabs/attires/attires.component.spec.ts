import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttiresComponent } from './attires.component';

describe('AttiresComponent', () => {
  let component: AttiresComponent;
  let fixture: ComponentFixture<AttiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttiresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AttiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
