import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FornitoriService } from '../../SERVICE/fornitoriservice/fornitori.service';

@Component({
    selector: 'app-fornitori',
    standalone: true,
    imports: [
        MatTableModule,
        HttpClientModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    templateUrl: './fornitori.component.html',
    styleUrl: './fornitori.component.css',
})
export class FornitoriComponent {
    fornitoriForm: FormGroup;

    pos: number;

    vista: String = 'Visualizza';

    displayedColumns: string[] = ['id', 'nome', 'descrizione', 'buttons'];

    //array della get
    dataSource: any[];

    constructor(
        private fornitoriService: FornitoriService,
        fornitoriBuilder: FormBuilder
    ) {
        this.fornitoriForm = fornitoriBuilder.group({
            nome: ['', Validators.required],
            descrizione: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.update();
    }

    update() {
        this.fornitoriService.getData().subscribe({
            next: (result) => {
                console.log('Get Andata a buon fine');
                this.dataSource = Object.values(result);
                console.log(this.dataSource);
            },
            error: (error) => {
                console.log('Get non riuscita, ' + error);
            },
        });
    }

    changeAggiungi() {
        this.vista = 'Aggiungi';
    }

    changeModifica(pos: number) {
        this.vista = 'Modifica';
        this.pos = pos;
    }

    changeVisualizza() {
        this.vista = 'Visualizza';
    }

    sendForm() {
        if (this.vista === 'Aggiungi') {
            this.fornitoriService.postData(this.fornitoriForm.value).subscribe({
                next: () => {
                    console.log('Post Andata a Buon fine');
                    this.update();
                },
                error: () => {
                    console.log('Post non andata a Buon Fine');
                },
            });
        }

        if (this.vista === 'Modifica') {
            this.fornitoriForm.value.id = this.dataSource.at(this.pos).id;
            this.fornitoriService
                .putData(
                    this.fornitoriForm.value,
                    this.dataSource.at(this.pos).id
                )
                .subscribe({
                    next: () => {
                        console.log('Put Andata a Buon fine');
                        this.update();
                    },
                    error: () => {
                        console.log('Put non andata a Buon Fine');
                    },
                });
        }
        this.changeVisualizza();
    }

    deleteByPos(pos: number) {
        this.fornitoriService.deleteData(this.dataSource.at(pos).id).subscribe({
            next: () => {
                console.log('Delete Andata a Buon fine');
                this.update();
            },
            error: (error) => {
                console.log('Delete non Andata a Buon fine' + error);
            },
        });
    }
}
