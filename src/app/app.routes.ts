import { Routes } from '@angular/router';
import { Panel } from './pages/panel/panel';
import { Totem } from './pages/totem/totem';

export const routes: Routes = [
    {path: '', component:Panel},
    {path: 'totem', component:Totem}
];
