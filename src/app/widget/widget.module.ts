import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { ChartModule } from '../chart/chart.module';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [ CommonModule, ChartModule, MatCardModule, MatIconModule, MatButtonModule ],
  declarations: [WidgetComponent],
  exports: [ WidgetComponent ]
})
export class WidgetModule { }
