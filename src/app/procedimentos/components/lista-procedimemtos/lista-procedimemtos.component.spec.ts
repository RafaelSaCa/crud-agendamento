import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcedimemtosComponent } from './lista-procedimemtos.component';

describe('ListaProcedimemtosComponent', () => {
  let component: ListaProcedimemtosComponent;
  let fixture: ComponentFixture<ListaProcedimemtosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProcedimemtosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaProcedimemtosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
