import { Injectable } from '@angular/core';
import {LOCAL_STORAGE_KEY, OPERATIONS} from '../../app.constants';
import {CityWeatherDetails} from '../models/weather-api.models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  currentZipCodesDetails: Array<CityWeatherDetails> = [];

  constructor() { }

  addZipCode(zipCode: string): string {
    const zipCodes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (!zipCodes.find(x => x === zipCode)) {
      zipCodes.push(zipCode);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(zipCodes));
      return OPERATIONS.SUCCESS;
    } else {
      return OPERATIONS.ZIP_CODE_ALREADY_PRESENT;
    }
  }

  removeZipCode(zipCode: string): string {
    const zipCodes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const zipCodeIndex = zipCodes.findIndex(x => x === zipCode);
    if (zipCodeIndex > -1) {
      zipCodes.splice(zipCodeIndex, 1);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(zipCodes));
      return OPERATIONS.SUCCESS;
    } else {
      return OPERATIONS.ZIP_CODE_NOT_FOUND;
    }
  }

  getZipCodes(): Array<string> {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  }
}
