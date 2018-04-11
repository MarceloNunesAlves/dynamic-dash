import { Component, OnInit, Input } from '@angular/core';
import { SubItem, Metric } from '../services/flex4.clazz';

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
  @Input() optionGraph: Metric[];

  constructor() {}

  ngOnInit() {
  }

}
