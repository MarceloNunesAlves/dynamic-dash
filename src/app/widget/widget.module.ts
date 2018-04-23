import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { ChartModule } from '../chart/chart.module';
import { MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ CommonModule, ChartModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, MatTooltipModule ],
  declarations: [WidgetComponent],
  exports: [ WidgetComponent ]
})
export class WidgetModule { }
