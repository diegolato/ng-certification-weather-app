import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CitiesWeatherLayoutComponent} from './cities-weather-layout/cities-weather-layout.component';
import {CityWeatherForecastComponent} from './city-weather-forecast/city-weather-forecast.component';

const routes: Routes = [
  { path: '', component: CitiesWeatherLayoutComponent },
  { path: 'forecast/:zipcode', component: CityWeatherForecastComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
