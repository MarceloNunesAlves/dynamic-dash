import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/map';
import { RoutingModule } from './app-routes';
import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { ChartModule } from './chart/chart.module';
import { CreateWidgetComponent } from './create-widget/create-widget.component';
import { MatChipInputEvent, MatChipsModule, MatInputModule, MatIconModule, MatAutocompleteModule, MatListModule } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MetricService } from './services/metric.service';
import { SiteService } from './services/site.service';
import { NodeService } from './services/node.service';
import { GroupService } from './services/group.service';
import { FiltroName } from './create-widget/filtro.pipes';

@NgModule({
  declarations: [
    AppComponent,
    CreateWidgetComponent,
    FiltroName
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartModule,
    BoardModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatListModule
  ],
  providers: [ MetricService, SiteService, NodeService, GroupService ],
  bootstrap: [AppComponent],
  exports: [
    FiltroName
  ]
})
export class AppModule { }
