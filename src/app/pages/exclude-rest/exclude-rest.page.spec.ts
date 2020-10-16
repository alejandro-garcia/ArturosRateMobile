import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcludeRestPage } from './exclude-rest.page';

describe('ExcludeRestPage', () => {
  let component: ExcludeRestPage;
  let fixture: ComponentFixture<ExcludeRestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcludeRestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcludeRestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
