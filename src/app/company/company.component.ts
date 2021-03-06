import { Component, Input } from '@angular/core';
import { Company, Color, DetailColor } from '../services/dash.clazz';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FileHolder } from 'angular2-image-upload';
import { CompanyService } from '../services/company.service';
import { element } from 'protractor';
import { AlterSassService } from '../services/alterSass.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  constructor(public formBuilder: FormBuilder, public service: CompanyService, public serviceSass: AlterSassService) {
    this.company = new Company();

    this.service.list().subscribe(list => {
      if (list && list.length > 0) {
        this.company = list[0];
      }
    });

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

    this.service.post(this.company).subscribe(item => {
      // Gera o scss de variáveis
      let color: Color = new Color(
                  new DetailColor(item.colorPrimary, item.fontPrimaryDark),
                  new DetailColor(item.colorSecondary, item.fontSecondaryDark));

      this.serviceSass.post(color).subscribe(obj => console.log('Cor alterada com sucesso!'),
                                              error => console.log('Serviço de alteração do Sass desligado!'));
    });
  }

  onUploadFinished(file: FileHolder) {
    this.company.logo = file.src;
  }

}
