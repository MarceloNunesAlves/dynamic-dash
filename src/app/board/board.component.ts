import { Component, Input, Inject } from '@angular/core';
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
export class BoardComponent {

  @Input() dashboard: Dashboard = new Dashboard();
  dashboards: Array<Dashboard>;

  constructor(public service: DashboardService, public serviceRowView: RowViewService) {
    service.list().subscribe((res) => {
      this.dashboards = res;
      if (this.dashboards.length > 0) {
        this.dashboard = this.dashboards[0];
        serviceRowView.listByDashboard(this.dashboard).subscribe(rows => {
          rows.forEach(row => this.dashboard.rowsView.push(row));
        });
      }
    });
  }

  updateDash() {
    this.dashboard.rowsView.forEach(row => {
      if (row.widgets.length > 0) {
        this.serviceRowView.post(row).subscribe(res => {
          console.log(res);
        });
      } else {
        this.serviceRowView.delete(row).subscribe(res => {
          console.log(res);
        });
      }
    });
  }

}
