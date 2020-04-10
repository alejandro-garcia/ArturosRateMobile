import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRatePage } from './add-rate.page';

describe('AddRatePage', () => {
  let component: AddRatePage;
  let fixture: ComponentFixture<AddRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
