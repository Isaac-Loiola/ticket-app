import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  imports: [ReactiveFormsModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.css',
  host: { class: 'flex flex-col gap-6 xl:gap-8 flex-1' }
})
export class UserAdd {
  setores = [
    { value: 'clinica-geral', label: 'Clínica Geral' },
    { value: 'pediatria', label: 'Pediatria' },
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'neurologia', label: 'Neurologia' },
    { value: 'dermatologia', label: 'Dermatologia' },
  ];

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    setor: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }
}
