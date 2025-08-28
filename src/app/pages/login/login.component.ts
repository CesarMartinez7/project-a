import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { featherUser, featherUserPlus } from '@ng-icons/feather-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../core/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIcon, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  viewProviders: [provideIcons({ featherUser, featherUserPlus })],
})
export class LoginComponent implements OnInit { // Implements OnInit is necessary
  form: FormGroup;
  _SERVICE_HTTP = inject(GlobalService);
  response!: any;
  _ROUTER = inject(Router)

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required], // Corrected typo in the form control name
    });
  }

  ngOnInit(): void {
    
  }

  handleSubmitForm() {
    
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const body = {
      username: this.form.get('nombre')?.value,
      password: this.form.get('contrasena')?.value, 
    };
    
  
    this._SERVICE_HTTP.__HTTP.post("http://127.0.0.1:8000/login", body).subscribe({
      next: (res) => {
        this.response = res;
        console.log(res)
        console.log("Respuesta del servidor:", this.response);
        this._ROUTER.navigateByUrl("/productos")
      },
      error: (e) => {
        console.error("Error en la petición:", e);
        alert("Ocurrió un error. Por favor, intenta de nuevo.");
      }
    });
  }
}