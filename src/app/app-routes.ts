import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CreateWidgetComponent } from './create-widget/create-widget.component';
import { CompanyComponent } from './company/company.component';

export const routes: Routes = [
    {
        path: '',
        component: BoardComponent
    },
    {
        path: 'main-board',
        component: BoardComponent
    },
    {
        path: 'company',
        component: CompanyComponent
    },
    {
        path: 'widget',
        component: CreateWidgetComponent
    },
    {
        path: 'widget/:id',
        component: CreateWidgetComponent
    },
    {
        path: 'widget/dash/:idDash',
        component: CreateWidgetComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
