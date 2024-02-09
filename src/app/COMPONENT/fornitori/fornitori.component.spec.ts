import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornitoriComponent } from './fornitori.component';

describe('FornitoriComponent', () => {
  let component: FornitoriComponent;
  let fixture: ComponentFixture<FornitoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornitoriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FornitoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
