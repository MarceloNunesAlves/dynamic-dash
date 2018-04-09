import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  moduleId: module.id,
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  rowsDrag: Array<RowView> = [
    new RowView(1, [
            new Container(1, 'Container 1', [new WidgetComponent()]),
            new Container(2, 'Container 2', [new WidgetComponent()])
                  ]),
    new RowView(2, [
      new Container(3, 'Container 3', [new WidgetComponent()]),
            ]),
    new RowView(4, [
      new Container(4, 'Container 4', [new WidgetComponent()]),
            ])
  ];
/*'Grafico 1','Grafico 2','Grafico 3','Grafico 4'*/
  ngOnInit() {
  }

}

class RowView {
  constructor(public id: number, public containers: Array<Container>) { }
}

class Container {
  constructor(public id: number, public name: string, public widgets: Array<WidgetComponent>) { }
}
