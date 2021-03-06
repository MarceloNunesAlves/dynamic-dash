import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { WidgetModule} from '../widget/widget.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { MatChipsModule, MatInputModule, MatIconModule, MatButtonModule,
  MatAutocompleteModule, MatListModule, MatToolbarModule, MatSidenavModule,
  MatCardModule, MatRadioModule, MatExpansionModule, MatMenuModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    WidgetModule, FormsModule, ReactiveFormsModule,
    MatChipsModule, MatInputModule, MatIconModule, MatButtonModule,
    MatAutocompleteModule, MatListModule, MatToolbarModule, MatSidenavModule,
    MatCardModule, MatRadioModule, MatExpansionModule, MatMenuModule,
    RouterModule, MatTooltipModule,
    DndModule.forRoot()
  ],
  declarations: [
    BoardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class BoardModule { }
