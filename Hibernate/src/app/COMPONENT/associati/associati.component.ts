import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AssociatiserviceService } from '../../SERVICE/associatiservice/associatiservice.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    FormGroup,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ClientiService } from '../../SERVICE/clientiservice/clienti.service';
import { FornitoriService } from '../../SERVICE/fornitoriservice/fornitori.service';
import { MatSelectModule } from '@angular/material/select';
import { error } from 'console';

@Component({
    selector: 'app-associati',
    standalone: true,
    imports: [
        MatTableModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    templateUrl: './associati.component.html',
    styleUrl: './associati.component.css',
})
export class AssociatiComponent {
    //formgroup associati
    associatiForm: FormGroup;

    //per la put perchè mi è più facile questa logica
    pos: number;

    //gestione form/lista
    vista: string = 'Visualizza';

    //colonne
    displayedColumns: string[] = ['id', 'cliente', 'fornitore', 'buttons'];

    //dove va a finire la get di associati
    dataSource: any[];

    //get di clienti
    clienti: any[];

    //get di fornitori
    fornitori: any[];

    constructor(
        private associatiService: AssociatiserviceService,
        private associatiBuilder: FormBuilder,
        private clientiService: ClientiService,
        private fornitoriService: FornitoriService
    ) {
        this.associatiForm = this.associatiBuilder.group({
            idCliente: ['', Validators.required],
            idFornitore: ['', Validators.required],
        });
    }

    updateAssociati() {
        this.associatiService.getData().subscribe({
            next: (result) => {
                this.dataSource = Object.values(result);
                console.log('Get anadata a buon fine');
            },
            error: (error) => {
                console.log('Get non andata a buon fine' + error);
            },
        });
    }

    updateClienti() {
        this.clientiService.getData().subscribe({
            next: (result) => {
                this.clienti = Object.values(result);
                console.log('Get anadata a buon fine');
            },
            error: (error) => {
                console.log('Get non andata a buon fine' + error);
            },
        });
    }

    updateFornitori() {
        this.fornitoriService.getData().subscribe({
            next: (result) => {
                this.fornitori = Object.values(result);
                console.log('Get anadata a buon fine');
            },
            error: (error) => {
                console.log('Get non andata a buon fine' + error);
            },
        });
    }

    ngOnInit() {
        this.updateAssociati();
        this.updateClienti();
        this.updateFornitori();
    }

    changeAggiungi() {
        this.vista = 'Aggiungi';
    }

    changeModifica(pos: number) {
        this.pos = pos;
        this.vista = 'Modifica';
    }

    changeVisualizza() {
        this.vista = 'Visualizza';
    }

    sendForm() {
        console.log(this.associatiForm.value);
        if (this.vista === 'Aggiungi') {
            this.associatiService.postData(this.associatiForm.value).subscribe({
                next: () => {
                    console.log('Post Avvenuta');
                    this.updateAssociati();
                },
                error: (error) => {
                    console.log('Post non avvenuta' + error);
                },
            });
        }

        if (this.vista === 'Modifica') {
            this.associatiForm.value.id = this.dataSource.at(this.pos).id;
            this.associatiService
                .putData(
                    this.associatiForm.value,
                    this.dataSource.at(this.pos).id
                )
                .subscribe({
                    next: () => {
                        console.log('Put Andata a buon fine');
                        this.updateAssociati();
                    },
                    error: (error) => {
                        console.log('Put non eseguita ' + error);
                    },
                });
        }

        this.changeVisualizza();
    }

    deleteByPos(pos: number) {
        this.associatiService.deleteData(this.dataSource.at(pos).id).subscribe({
            next: () => {
                console.log('Delete Andata a buon fine');
                this.updateAssociati();
            },
            error: (error) => {
                console.log('Delete non eseguita ' + error);
            },
        });
    }
}
