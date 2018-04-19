import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { SubItem, Metric } from '../services/flex4.clazz';
import { Chart, ChartComponent } from '../chart/chart.component';
import { WidgetService } from '../services/widget.service';
import { element } from 'protractor';
import * as $ from 'jquery';
import { MatCard } from '@angular/material';

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
  @ViewChild('chart_dash') chart: ChartComponent;

  constructor(public serviceWidget: WidgetService, public elemento:ElementRef) {
  }

  ngAfterViewInit() {
    this.chart.createGraph();
  }


  delete() {
    this.serviceWidget.delete(this).subscribe(res => {
      $(this.elemento.nativeElement).fadeOut('slow');
    }, error => console.log(error));
  }
}
