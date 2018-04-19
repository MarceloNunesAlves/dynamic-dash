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
    @Input() name: string;
    @Input() colorPrimary: string;
    @Input() fontPrimaryDark: boolean = true;
    @Input() colorSecondary: string;
    @Input() fontSecondaryDark: boolean = true;
    logo: string;
}

export class Color {
    colorPrimary: DetailColor;
    colorSecondary: DetailColor;

    constructor(colorPrimary: DetailColor, colorSecondary: DetailColor) {
        this.colorPrimary = colorPrimary;
        this.colorSecondary = colorSecondary;
    }
}

export class DetailColor {
    hex: string;
    dark: boolean;

    constructor(hex: string, dark: boolean) {
        this.hex = hex.replace('#', '');
        this.dark = dark;
    }
}
