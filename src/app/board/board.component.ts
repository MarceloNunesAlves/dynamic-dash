import { Component, OnInit, Input, Inject } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RowView, Dashboard, DashboardService } from '../services/dashboard.service';
import { element } from 'protractor';

@Component({
  moduleId: module.id,
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() rowsDrag: Array<RowView> = [
    new RowView(1, [
      new WidgetComponent(1, 'Container 1'),
      new WidgetComponent(2, 'Container 2')
    ]),
    new RowView(2, [
      new WidgetComponent(3, 'Container 3'),
    ]),
    new RowView(4, [
      new WidgetComponent(4, 'Container 4'),
    ])
  ];

  constructor(public dialog: MatDialog) { }

  /*'Grafico 1','Grafico 2','Grafico 3','Grafico 4'*/
  ngOnInit() {
  }

  addRow() {
    this.rowsDrag.push(new RowView(5, [new WidgetComponent(5, 'Container 5')]));
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogDashboardComponent, {
      width: '350px',
      data: new Dashboard()
    });
  }
}

@Component({
  selector: 'dialog-add-dash',
  styleUrls: ['board.dialog-add-dash.css'],
  templateUrl: 'board.dialog-add-dash.html'
})
export class DialogDashboardComponent {
  formCreateDash: FormGroup;
  service: DashboardService;
  @Input() data: Dashboard;

  constructor( public dialogRef: MatDialogRef<DialogDashboardComponent>, @Inject(MAT_DIALOG_DATA) data: Dashboard,
                service: DashboardService) {
    this.data = data;
    this.service = service;
    this.formCreateDash = new FormGroup({
      titleDash: new FormControl()
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    console.log(this.data);
    this.service.post(this.data).subscribe(res => {
      console.log(res);
    });
    this.dialogRef.close();
  }
}
