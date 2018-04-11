import { Input } from "@angular/core";
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
    constructor(dashboard: Dashboard, public containers: Array<WidgetComponent>) {
        this.dashboard = dashboard;
    }
}