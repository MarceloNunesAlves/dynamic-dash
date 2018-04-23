import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { SubItem, Metric } from '../services/flex4.clazz';
import { Chart, ChartComponent } from '../chart/chart.component';
import { WidgetService } from '../services/widget.service';
import { element } from 'protractor';
import * as $ from 'jquery';
import { MatCard } from '@angular/material';
import { RowView, Dashboard } from '../services/dash.clazz';
import { RowViewService } from '../services/rowview.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  @Input() id: number;
  @Input() name: string;
  @Input() height: string;
  @Input() classCol: string;
  @Input() columnLayout: string;
  @Input() caption: string;
  @Input() optionGraph: Metric[] = [];
  @Input() idDash: string;
  @Input() row: RowView;
  @ViewChild('chart_dash') chart: ChartComponent;

  constructor(public serviceWidget: WidgetService, public elemento:ElementRef, public serviceRowView: RowViewService) {
  }

  ngAfterViewInit() {
    this.chart.createGraph();
  }


  delete() {
    this.serviceWidget.delete(this).subscribe(res => {
      $(this.elemento.nativeElement).fadeOut('slow');
    }, error => console.log(error));
  }

  addNewRow(){
    let widgetNew: WidgetComponent = this.row.widgets.filter((e1) => {
      return e1.id === this.id;
    })[0];

    /* Removendo widget da nova linha */
    let rowsView: RowView[] = [];
    this.row.widgets = this.row.widgets.filter((e1) => {
      return e1.id !== this.id;
    });
    rowsView.push(this.row);

    /* Criando nova linha */
    const dashSel: Dashboard = new Dashboard();
    dashSel.id = Number(this.idDash);
    widgetNew.id = null;
    widgetNew.optionGraph.forEach(op => {
      op.id = null;
      op.options.forEach(subop => {
        subop.id = null;
      })
    });
    const rowView: RowView = new RowView(dashSel, [widgetNew]);
    rowsView.push(rowView);

    rowsView.forEach(row => {
      if (row.widgets.length > 0) {
        this.serviceRowView.post(row).subscribe(res => {
          console.log('Linha atualizada!');
          window.location.reload();
        });
      } else {
        this.serviceRowView.delete(row);
      }
    });
  }
}
