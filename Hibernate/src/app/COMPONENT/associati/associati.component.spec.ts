import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatiComponent } from './associati.component';

describe('AssociatiComponent', () => {
  let component: AssociatiComponent;
  let fixture: ComponentFixture<AssociatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
