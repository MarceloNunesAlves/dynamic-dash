import { Component, Input } from '@angular/core';
import { Company } from '../services/dash.clazz';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FileHolder } from 'angular2-image-upload';
import { CompanyService } from '../services/company.service';
import { element } from 'protractor';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  constructor(public formBuilder: FormBuilder, public service: CompanyService) {
    this.company = new Company();
    this.formCompany = this.formBuilder.group({
      name: [{value: ''}],
      colorPrimary: [{value: ''}],
      colorSecondary: [{value: ''}],
      fontPrimaryDark: [{value: ''}],
      fontSecondaryDark: [{value: ''}]
    });
  }

  @Input() company: Company;
  formCompany: FormGroup;

  salvar(event) {
    event.preventDefault();
    console.log(this.company);
    this.service.post(this.company).subscribe(item => console.log(item));
  }

  onUploadFinished(file: FileHolder) {
    console.log(file);
    this.company.logo = file.file;
  }

}
