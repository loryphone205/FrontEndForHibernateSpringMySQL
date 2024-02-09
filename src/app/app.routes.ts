import { Routes } from '@angular/router';
import { HomepageComponent } from './COMPONENT/homepage/homepage.component';
import { ClientiComponent } from './COMPONENT/clienti/clienti.component';
import { AssociatiComponent } from './COMPONENT/associati/associati.component';
import { FornitoriComponent } from './COMPONENT/fornitori/fornitori.component';

export const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'cliente', component: ClientiComponent },
    { path: 'associato', component: AssociatiComponent },
    { path: 'fornitore', component: FornitoriComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
