import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuItem,
        MatMenuModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    //variabile per cambiare il nome nella navbar
    position: String = 'Homepage';

    //costruttore per le rotte ecc
    constructor(private rotte: Router) {}

    //cambio di rotte
    changeHomepage() {
        this.rotte.navigate(['/home']);
        this.position = 'Homepage';
    }

    changeClienti() {
        this.rotte.navigate(['/cliente']);
        this.position = 'Clienti';
    }

    changeAssociati() {
        this.rotte.navigate(['/associato']);
        this.position = 'Associati';
    }

    changeFornitori() {
        this.rotte.navigate(['/fornitore']);
        this.position = 'Fornitori';
    }
}
