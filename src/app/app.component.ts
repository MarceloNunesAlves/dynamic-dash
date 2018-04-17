import { Component, Input, Inject, HostBinding, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { ThemeService } from './services/theme.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Dashboard } from './services/dash.clazz';
import { OverlayContainer} from '@angular/cdk/overlay';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dashboard - Dinâmico';

  @HostBinding('class') componentCssClass;

  constructor(public dialog: MatDialog, public overlayContainer: OverlayContainer,
              public themeService: ThemeService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDashboardComponent, {
      width: '350px',
      data: new Dashboard()
    });
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;

    this.exportPdf();
  }

  exportPdf() {
    this.themeService.theme().subscribe(data => {
      // saveAs(new Blob([data]), `report.pdf`);
    });
    let f: File = new File([''], 'text.txt');
    console.log(f);
 }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-dialog-add-dash',
  styleUrls: ['dialog/board.dialog-add-dash.css'],
  templateUrl: 'dialog/board.dialog-add-dash.html'
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
