import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {OPERATIONS} from '../app.constants';
import {WeatherApiService} from '../shared/services/weather-api.service';
import {CityWeatherDetails} from '../shared/models/weather-api.models';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';

const ERROR_MESSAGES = {
  alreadyPresent: "This zip code is already present in list",
  notValid: "This zip code does not exist"
};

@Component({
  selector: 'app-cities-weather-layout',
  templateUrl: './cities-weather-layout.component.html',
  styleUrls: ['./cities-weather-layout.component.css']
})
export class CitiesWeatherLayoutComponent implements OnInit {

  zipCodeToAdd = "";
  weatherDetailsByZipCodeToAdd: CityWeatherDetails;
  currentZipCodesDetails: Array<CityWeatherDetails> = [];
  errorMessage = "";
  constructor(private localStorageService: LocalStorageService,
              private weatherApiService: WeatherApiService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.localStorageService.currentZipCodesDetails.length > 0) {
      this.currentZipCodesDetails = this.localStorageService.currentZipCodesDetails;
    } else {
      this.initializeFromLocalStorage();
    }
  }

  initializeFromLocalStorage(): void {
    const zipCodes = this.localStorageService.getZipCodes();
    const getWeatherApiArray = [];
    zipCodes.forEach((zipCode) => {
      getWeatherApiArray.push(this.weatherApiService.getWeatherDetailsByZipcode(zipCode));
    });
    forkJoin(getWeatherApiArray).subscribe(
  (responseList: Array<CityWeatherDetails>) => {
      responseList.forEach((details, index) => {
        details.zipCode = zipCodes[index];
        this.currentZipCodesDetails.push(details);
      });
    },
  (error) => {
      console.error(error);
    });
  }

  checkZipCodeLength(): boolean {
    return this.zipCodeToAdd.length < 5;
  }

  addZipCode(): void {
    this.errorMessage = '';
    this.getCityWeatherDetail(this.zipCodeToAdd);
  }

  addZipCodeToLocalStorage(): void {
    const operationResult = this.localStorageService.addZipCode(this.zipCodeToAdd);
    if (operationResult === OPERATIONS.ZIP_CODE_ALREADY_PRESENT) {
      this.errorMessage = ERROR_MESSAGES.alreadyPresent;
    } else if (operationResult === OPERATIONS.SUCCESS) {
      this.currentZipCodesDetails.push(this.weatherDetailsByZipCodeToAdd);
      this.zipCodeToAdd = '';
      this.errorMessage = '';
      this.weatherDetailsByZipCodeToAdd = null;
    }
  }

  removeZipCodeFromLocalStorage(zipCode: string): void {
    const operationResult = this.localStorageService.removeZipCode(zipCode);
    if (operationResult === OPERATIONS.ZIP_CODE_NOT_FOUND) {
      console.error("Something is wrong");
    } else if (operationResult === OPERATIONS.SUCCESS) {
      const zipCodeIndex = this.currentZipCodesDetails.findIndex(x => x.zipCode === zipCode);
      if (zipCodeIndex > -1) {
        this.currentZipCodesDetails.splice(zipCodeIndex, 1);
      } else {
        console.error("Something is wrong");
      }
    }
  }

  navigateToZipCode(zipCode: string): void {
    this.localStorageService.currentZipCodesDetails = this.currentZipCodesDetails;
    this.router.navigateByUrl('/forecast/' + zipCode);
  }

  getCityWeatherDetail(zipCode): void {
    this.weatherApiService.getWeatherDetailsByZipcode(zipCode).subscribe(
      (response) => {
        console.log(response);
        this.weatherDetailsByZipCodeToAdd = response;
        this.weatherDetailsByZipCodeToAdd.zipCode = zipCode;
        this.addZipCodeToLocalStorage();
      },
      (error) => {
        console.error(error);
        this.errorMessage = ERROR_MESSAGES.notValid;
      }
    );
  }

}
