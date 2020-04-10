import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateStatusPage } from './update-status.page';

describe('UpdateStatusPage', () => {
  let component: UpdateStatusPage;
  let fixture: ComponentFixture<UpdateStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
