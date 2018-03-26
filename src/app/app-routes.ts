import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CreateWidgetComponent } from './create-widget/create-widget.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children:
            [
                {
                    path: '',
                    redirectTo: 'main-board',
                    pathMatch: 'full'
                },
                {
                    path: 'main-board',
                    component: BoardComponent
                }
            ]
    },
    {
        path: 'create-widget',
        component: CreateWidgetComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
