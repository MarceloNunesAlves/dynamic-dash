import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { WidgetModule} from '../widget/widget.module';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    DndModule.forRoot()
  ],
  declarations: [
    BoardComponent
  ]
})
export class BoardModule { }
