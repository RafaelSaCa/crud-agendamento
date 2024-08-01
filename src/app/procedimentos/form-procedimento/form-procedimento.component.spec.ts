import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProcedimentoComponent } from './form-procedimento.component';

describe('FormProcedimentoComponent', () => {
  let component: FormProcedimentoComponent;
  let fixture: ComponentFixture<FormProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProcedimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
