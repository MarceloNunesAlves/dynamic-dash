import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/map';
import { RoutingModule } from './app-routes';
import { AppComponent, DialogDashboardComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { ChartModule } from './chart/chart.module';
import { CreateWidgetComponent } from './create-widget/create-widget.component';
import { MatChipInputEvent, MatChipsModule, MatInputModule, MatIconModule, MatButtonModule,
        MatAutocompleteModule, MatListModule, MatToolbarModule, MatSidenavModule, MatDrawer,
        MatCardModule, MatRadioModule, MatExpansionModule, MatSlideToggleModule } from '@angular/material';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MetricService } from './services/metric.service';
import { SiteService } from './services/site.service';
import { NodeService } from './services/node.service';
import { GroupService } from './services/group.service';
import { WidgetService } from './services/widget.service';
import { RowViewService } from './services/rowview.service';
import { FiltroName } from './create-widget/filtro.pipes';

/* Covalent - teradata.github.io */
import { CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
        CovalentStepsModule, CovalentLoadingModule, CovalentDialogsModule, CovalentSearchModule, CovalentPagingModule,
        CovalentNotificationsModule, CovalentMenuModule, CovalentDataTableModule, CovalentMessageModule } from '@covalent/core';

import 'hammerjs';
import { ThemeService } from './services/theme.service';
import { CompanyComponent } from './company/company.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageUploadModule } from "angular2-image-upload";
import { CompanyService } from './services/company.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateWidgetComponent,
    FiltroName,
    DialogDashboardComponent,
    CompanyComponent
  ],
  entryComponents: [DialogDashboardComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartModule,
    BoardModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,

    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    /*Layout*/
    OverlayModule,
    /* Color picker */
    ColorPickerModule,
    ImageUploadModule.forRoot()
  ],
  providers: [ MetricService, SiteService, NodeService, GroupService, WidgetService, RowViewService, ThemeService, CompanyService ],
  bootstrap: [AppComponent],
  exports: [
    FiltroName
  ]
})
export class AppModule { }
