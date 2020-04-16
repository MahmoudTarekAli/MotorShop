import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllCategoriesComponent } from './allCategories.component';
describe('AlldoctorsComponent', () => {
  let component: AllCategoriesComponent;
  let fixture: ComponentFixture<AllCategoriesComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllCategoriesComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
