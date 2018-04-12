import { Component, OnInit, Input, Inject } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { RowView, Dashboard } from '../services/dash.clazz';
import { element } from 'protractor';
import { RowViewService } from '../services/rowview.service';

@Component({
  moduleId: module.id,
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() dashboard: Dashboard = new Dashboard();
  dashboards: Array<Dashboard>;

  constructor(public dialog: MatDialog, public service: DashboardService, public serviceRowView: RowViewService) {
    service.list().subscribe((res) => {
      this.dashboards = res;
      if (this.dashboards.length > 0) {
        this.dashboard = this.dashboards[0];
        serviceRowView.listByDashboard(this.dashboard).subscribe(rows => {
          rows.forEach(row => this.dashboard.rowsView.push(row));
        });
      }
    });
    console.log('Construtor!!!');
  }

  ngOnInit() {
  }

  viewDash() {
    console.log(this.dashboard);
  }

  addRow() {
    // this.dashboard.rowsView.push(new RowView(1, [new WidgetComponent()]));
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
  styleUrls: ['board.dialog-add-dash.css'],
  templateUrl: 'board.dialog-add-dash.html'
})
export class DialogDashboardComponent {
  formCreateDash: FormGroup;
  service: DashboardService;
  @Input() data: Dashboard;

  constructor( public dialogRef: MatDialogRef<DialogDashboardComponent>, @Inject(MAT_DIALOG_DATA) data: Dashboard,
                service: DashboardService) {
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
    console.log(this.data);
    this.service.post(this.data).subscribe(res => {
      console.log(res);
    });
    this.dialogRef.close();
  }
}
