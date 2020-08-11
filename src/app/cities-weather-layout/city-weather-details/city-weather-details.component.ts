import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CityWeatherDetails} from '../../shared/models/weather-api.models';
import {WeatherApiService} from '../../shared/services/weather-api.service';

@Component({
  selector: 'app-city-weather-details',
  templateUrl: './city-weather-details.component.html',
  styleUrls: ['./city-weather-details.component.css']
})
export class CityWeatherDetailsComponent implements OnInit {
  @Input() weatherDetails: CityWeatherDetails;
  @Output() zipCodeToRemove = new EventEmitter<string>();
  @Output() zipCodeToShow = new EventEmitter<string>();
  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit(): void {
  }

  removeZipCode(zipCode: string): void {
    this.zipCodeToRemove.emit(zipCode);
  }

  getWeatherIcon(weatherIconCase: string): string {
    return this.weatherApiService.getWeatherIcon(weatherIconCase);
  }

  navigateToZipCodeDetails(zipCode: string): void {
    this.zipCodeToShow.emit(zipCode);
  }

  getCelsiusDegrees(degree: number) {
    return this.weatherApiService.fromKelvinToCelsius(degree);
  }

}
