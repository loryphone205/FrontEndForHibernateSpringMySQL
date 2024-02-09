import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ClientiService } from '../../SERVICE/clientiservice/clienti.service';
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

@Component({
    selector: 'app-clienti',
    standalone: true,
    imports: [
        MatTableModule,
        HttpClientModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './clienti.component.html',
    styleUrl: './clienti.component.css',
})
export class ClientiComponent {
    //pos
    pos: number = 0;

    //formGroup
    clientiForm: FormGroup;

    //vista per il form/lista
    vista: String = 'Visualizza';

    displayedColumns: string[] = [
        'id',
        'nome',
        'cognome',
        'data_nascita',
        'buttons',
    ];

    //array della get
    dataSource: any[];

    constructor(
        private clientiService: ClientiService,
        private formBuilder: FormBuilder
    ) {
        this.clientiForm = this.formBuilder.group({
            nome: ['', Validators.required],
            cognome: ['', Validators.required],
            dataNascita: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.update();
    }

    update() {
        this.clientiService.getData().subscribe({
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

    changeVisualizza() {
        this.vista = 'Visualizza';
    }

    changeModifica(pos: number) {
        this.pos = pos;
        this.vista = 'Modifica';
    }

    deleteByPos(pos: number) {
        this.clientiService.deleteData(this.dataSource.at(pos).id).subscribe({
            next: () => {
                console.log('Delete Andata a buon fine');
                this.update();
            },
            error: (error) => {
                console.log('Delete non Eseguita' + error);
            },
        });
    }

    sendForm() {
        switch (this.vista) {
            case 'Aggiungi':
                this.clientiService.postData(this.clientiForm.value).subscribe({
                    next: () => {
                        console.log('Post Andata a buon fine');
                        this.update();
                    },
                    error: (error) => {
                        console.log('Post non Eseguita' + error);
                    },
                });
                break;
            case 'Modifica':
                this.clientiForm.value.id = this.dataSource.at(this.pos).id;
                this.clientiService
                    .putData(
                        this.clientiForm.value,
                        this.dataSource.at(this.pos).id
                    )
                    .subscribe({
                        next: () => {
                            console.log('Put Andata a buon fine');
                            this.update();
                        },
                        error: (error) => {
                            console.log('Put non Eseguita' + error);
                        },
                    });
        }
        this.changeVisualizza();
    }
}
