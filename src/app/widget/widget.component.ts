import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  id: number;
  @Input() name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  ngOnInit() {
  }

}
