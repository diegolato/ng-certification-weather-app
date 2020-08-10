import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesWeatherLayoutComponent } from './cities-weather-layout.component';

describe('CitiesWeatherLayoutComponent', () => {
  let component: CitiesWeatherLayoutComponent;
  let fixture: ComponentFixture<CitiesWeatherLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesWeatherLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesWeatherLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
