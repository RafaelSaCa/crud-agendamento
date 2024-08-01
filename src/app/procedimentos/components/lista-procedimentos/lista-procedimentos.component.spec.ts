import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcedimentosComponent } from './lista-procedimentos.component';

describe('ListaProcedimentosComponent', () => {
  let component: ListaProcedimentosComponent;
  let fixture: ComponentFixture<ListaProcedimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProcedimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProcedimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
