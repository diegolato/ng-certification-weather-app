import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherApiService} from '../shared/services/weather-api.service';
import {CityWeatherForecast} from '../shared/models/weather-api.models';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Component({
  selector: 'app-city-weather-forecast',
  templateUrl: './city-weather-forecast.component.html',
  styleUrls: ['./city-weather-forecast.component.css']
})
export class CityWeatherForecastComponent implements OnInit {

  zipCodeWeatherForecast: CityWeatherForecast;

  constructor(private route: ActivatedRoute,
              private weatherApiService: WeatherApiService) { }

  ngOnInit(): void {
    const zipcode = this.route.snapshot.params.zipcode;
    this.weatherApiService.getWeatherForecast5DaysByZipCode(zipcode).subscribe(
      (response) => {
        this.zipCodeWeatherForecast = response;
        this.zipCodeWeatherForecast.city.zipCode = zipcode;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDateFromTimestamp(dateTimestamp): string {
    const date = new Date(dateTimestamp * 1000);
    return DAYS[date.getDay()] + ', ' + MONTHS[date.getMonth()] + ' ' + date.getDate();
  }

  getWeatherIcon(weatherIconCase: string): string {
    return this.weatherApiService.getWeatherIcon(weatherIconCase);
  }

  getCelsiusDegrees(degree: number) {
    return this.weatherApiService.fromKelvinToCelsius(degree);
  }

}
