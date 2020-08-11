import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityWeatherDetailsComponent } from './cities-weather-layout/city-weather-details/city-weather-details.component';
import { CityWeatherForecastComponent } from './city-weather-forecast/city-weather-forecast.component';
import { CitiesWeatherLayoutComponent } from './cities-weather-layout/cities-weather-layout.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ],
  declarations: [ AppComponent, CityWeatherDetailsComponent, CityWeatherForecastComponent, CitiesWeatherLayoutComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
