import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { ChartModule } from '../chart/chart.module';

@NgModule({
  imports: [ CommonModule, ChartModule ],
  declarations: [WidgetComponent],
  exports: [ WidgetComponent ]
})
export class WidgetModule { }
