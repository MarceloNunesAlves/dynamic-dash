import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { SubItem, Metric } from '../services/flex4.clazz';
import { Chart, ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  id: number;
  @Input() name: string;
  @Input() height: string;
  @Input() classCol: string;
  @Input() caption: string;
  @Input() optionGraph: Metric[] = [];

  @ViewChild('chart_dash') chart: ChartComponent;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chart.createGraph();
  }

}
