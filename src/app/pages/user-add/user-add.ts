import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-user-add',
  imports: [ReactiveFormsModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.css',
  host: { class: 'flex flex-col gap-6 xl:gap-8 flex-1' }
})
export class UserAdd {
  constructor(
    private api: Api
  ){}

  setores = [
    { value: 'clinica-geral', label: 'Clínica Geral' },
    { value: 'pediatria', label: 'Pediatria' },
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'neurologia', label: 'Neurologia' },
    { value: 'dermatologia', label: 'Dermatologia' },
  ];

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    sector: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;
    
    this.api.createUser({
      id:0,
      ...this.form.value
    }).subscribe({
      next: () =>{
        console.log('User added successfully')
      },
      error: () =>{
        console.log('Error to add user')
      }
    })
    console.log(this.form.value);
  }
}
