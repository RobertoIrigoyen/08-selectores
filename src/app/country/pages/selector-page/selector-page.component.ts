import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss']
})
export class SelectorPageComponent {


  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    countries: ['', Validators.required],
    borders: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

}
