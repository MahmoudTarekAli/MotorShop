import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesInvoiceComponent } from './Products.component';
describe('AlldoctorsComponent', () => {
  let component: SalesInvoiceComponent;
  let fixture: ComponentFixture<SalesInvoiceComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesInvoiceComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
