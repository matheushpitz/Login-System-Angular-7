import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default-layout.component';
import { UserAdd } from '../user/user-add.component';
import { UserList } from '../user/user-list.component';

const routes: Routes = [
    {
        path: 'home',
        component: DefaultComponent,
        children: [
            {
                path: '',
                redirectTo: 'add',
                pathMatch: 'full'
            },
            {
                path: 'add',
                component: UserAdd
            },
            {
                path: 'list',
                component: UserList
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]    
})
export class DefaultLayourRoutingModule {}