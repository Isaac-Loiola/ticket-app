import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private auth:Auth,
    private router: Router,
  ){}

  login(){
    if(this.form.invalid) return;

    const {email, password} = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: () =>{
        this.router.navigate(['/call']);
      },
      error: () => {
        alert('Email ou senha inválidos');
      }
    })
  }
}
