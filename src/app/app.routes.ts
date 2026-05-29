import { Routes } from '@angular/router';
import { Layout } from './componets/layout/layout';
import { Panel } from './pages/panel/panel';
import { Totem } from './pages/totem/totem';
import { Attendance } from './pages/attendance/attendance';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { UserAdd } from './pages/user-add/user-add';

export const routes: Routes = [
    { path: 'login', component: Login },
    { 
        path: 'totem', 
        component: Totem, 
        canActivate: [authGuard] 
    },
    { 
        path: 'panel', 
        component: Panel 
    },
    {
        path: '',
        component: Layout,
        children: [
            { 
                path: 'call', 
                component: Attendance,
                canActivate: [authGuard]
            },
            { 
                path: 'new-user', 
                component: UserAdd, 
                canActivate: [authGuard]
            },
            { path: '', redirectTo: 'call', pathMatch: 'full' },
        ]
    },
]
