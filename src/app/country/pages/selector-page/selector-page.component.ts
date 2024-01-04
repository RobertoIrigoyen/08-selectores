import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss']
})
export class SelectorPageComponent implements OnInit {

  public countrieByRegion: SmallCountry[] = []

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    countries: ['', Validators.required],
    border: ['', Validators.required],
  })

  constructor(private fb: FormBuilder,
    private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.onRegionChange();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChange(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('countries')!.setValue('')),
        switchMap(region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe(countries => {
        this.countrieByRegion = countries;
      })
  }

}
