import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { countryInfo } from '../home/interface/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountry(): Observable<any>{
    const urlPeticion= `https://restcountries.eu/rest/v2/all`;
    return this.http.get<any>(urlPeticion);
  }
}
