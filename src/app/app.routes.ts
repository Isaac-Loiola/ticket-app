import { Routes } from '@angular/router';
import { Panel } from './pages/panel/panel';
import { Totem } from './pages/totem/totem';
import { Attendance } from './pages/attendance/attendance';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', component:Panel},
    {   
        path: 'totem',
        component:Totem, 
        canActivate: [authGuard]
    },
    {   
        path: 'call', 
        component:Attendance
    },
    {path: 'login', component:Login},
]