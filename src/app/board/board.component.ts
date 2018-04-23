import { Component, Input, Inject, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { RowView, Dashboard } from '../services/dash.clazz';
import { element } from 'protractor';
import { RowViewService } from '../services/rowview.service';
import { WidgetService } from '../services/widget.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() dashboard: Dashboard = new Dashboard();
  dashboards: Array<Dashboard>;

  constructor(public service: DashboardService, public serviceRowView: RowViewService,
              public route: ActivatedRoute, public router: Router) {

  }

  loadRows(dashboard) {
    this.serviceRowView.listByDashboard(dashboard).subscribe(rows => {
      rows.forEach(row => dashboard.rowsView.push(row));
    });
  }

  updateDash() {
    this.dashboard.rowsView.forEach(row => {
      if (row.widgets.length > 0) {
        this.serviceRowView.post(row).subscribe(res => {
          console.log('Dashboard atualizado!');
        });
      } else {
        this.serviceRowView.delete(row);
      }
    });
  }

  removerDash() {
    this.service.delete(this.dashboard).subscribe(res => {
      this.router.navigateByUrl('/');
      window.location.reload();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.service.get(id).subscribe(res => {
          this.dashboard = res;
          this.loadRows(this.dashboard);
        });
      } else {
        this.service.list().subscribe((res) => {
          this.dashboards = res;
          if (this.dashboards.length > 0) {
            this.dashboard = this.dashboards[0];
            this.loadRows(this.dashboard);
          }
        });
      }
    });
  }

}
