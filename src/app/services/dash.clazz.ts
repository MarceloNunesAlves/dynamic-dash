import { Input } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';

export class Dashboard {
    id: number;
    @Input() titleDash: string;
    @Input() rowsView: Array<RowView> = [];

    constructor () {}
}

export class RowView {
    id: number;
    dashboard: Dashboard;
    constructor(dashboard: Dashboard, public widgets: Array<WidgetComponent>) {
        this.dashboard = dashboard;
    }
}

export class Company {
    id: number;
    name: string;
    colorPrimary: string;
    fontPrimaryDark: boolean;
    colorSecondary: string;
    fontSecondaryDark: boolean;
    logo: string;
}
