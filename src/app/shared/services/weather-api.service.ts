import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CityWeatherDetails, CityWeatherForecast} from '../models/weather-api.models';
import {map} from 'rxjs/operators';


const WEATHER_MAIN = {
  Thundestorm: "rain",
  Drizzle: "rain",
  Rain: "rain",
  Snow: "snow",
  Atmosphere: "rain",
  Clear: "sun",
  Clouds: "clouds"
};

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  public getWeatherDetailsByZipcode(zipCode: string): Observable<CityWeatherDetails> {
    return this.http.get<CityWeatherDetails>(
      this.getWeatherDetailsByZipCodeUrl(zipCode)
    );
  }

  private getWeatherDetailsByZipCodeUrl(zipCode: string): string{
    return "https://api.openweathermap.org/data/2.5/weather?zip="
      + zipCode + "&appid=5a4b2d457ecbef9eb2a71e480b947604";
  }

  public getWeatherForecast5DaysByZipCode(zipCode: string): Observable<CityWeatherForecast> {
    return this.http.get<CityWeatherForecast>(
      this.getWeatherForecast5DaysByZipCodeUrl(zipCode)
    ).pipe(
      map((response) => {
        response.list = response.list.slice(0, 5);
        return response;
      })
    );
  }

  private getWeatherForecast5DaysByZipCodeUrl(zipCode: string): string{
    return "https://api.openweathermap.org/data/2.5/forecast/daily?zip="
      + zipCode + "&appid=5a4b2d457ecbef9eb2a71e480b947604";
  }

  public getWeatherIcon(weatherMainCase: string): string {
    return "https://www.angulartraining.com/images/weather/" + WEATHER_MAIN[weatherMainCase] + ".png";
  }
}
