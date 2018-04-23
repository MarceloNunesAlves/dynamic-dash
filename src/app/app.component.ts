import { Component, Input, Inject, HostBinding, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { ThemeService } from './services/theme.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Dashboard, Company } from './services/dash.clazz';
import { CompanyService } from './services/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dashboard - Dinâmico';

  @HostBinding('class') componentCssClass;
  company: Company;
  dashboards: Dashboard[];

  constructor(public dialog: MatDialog, public serviceCompany: CompanyService, public serviceDashboard: DashboardService) {
    this.company = new Company();

    this.serviceCompany.list().subscribe(list => {
      if (list && list.length > 0) {
        this.company = list[0];
      }
    });

    serviceDashboard.list().subscribe((res) => {
      this.dashboards = res;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDashboardComponent, {
      width: '350px',
      data: new Dashboard()
    });
  }
}

@Component({
  selector: 'app-dialog-add-dash',
  styleUrls: ['dialog/board.dialog-add-dash.css'],
  templateUrl: 'dialog/board.dialog-add-dash.html'
})
export class DialogDashboardComponent {
  formCreateDash: FormGroup;
  service: DashboardService;
  @Input() data: Dashboard;

  constructor( public dialogRef: MatDialogRef<DialogDashboardComponent>, @Inject(MAT_DIALOG_DATA) data: Dashboard,
                service: DashboardService, public route: ActivatedRoute, public router: Router) {
    this.data = data;
    this.service = service;
    this.formCreateDash = new FormGroup({
      titleDash: new FormControl()
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.service.post(this.data).subscribe(res => {
      this.router.navigateByUrl('/board/' + res.id);
    });
    this.dialogRef.close();
  }
}
