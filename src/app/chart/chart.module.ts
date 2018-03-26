import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [ CommonModule, FusionChartsModule ],
  declarations: [ChartComponent],
  exports: [ ChartComponent ]
})
export class ChartModule { }
