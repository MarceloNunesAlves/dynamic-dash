import { Component, Input } from '@angular/core';
import { Company } from '../services/dash.clazz';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  constructor() {
    this.formCompany = new FormGroup({
      name: new FormControl()
    });
  }

  @Input() company: Company;
  formCompany: FormGroup;

  salvar(event) {

  }

}
