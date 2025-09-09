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
import { environment as env, environment } from '../../../environments/environment.development';

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

  isLodingFetch = false

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required], // Corrected typo in the form control name
    });
  }

  ngOnInit(): void {
    
  }

  handleSubmitForm() {
    this.isLodingFetch = true
    if (this.form.invalid) {      
      this._SERVICE_HTTP.__NOTYF.error("Por favor, completa todos los campos.")
      return;
    }

    const body = {
      username: this.form.get('nombre')?.value,
      password: this.form.get('contrasena')?.value, 
    };
    
  
    this._SERVICE_HTTP.__HTTP.post(`${env.url}${environment.port}`, body).subscribe({
      next: (res) => {
        this.response = res;
        console.log(res)
        if(this.response.success){
          this._ROUTER.navigateByUrl("/productos")
        }
        this._SERVICE_HTTP.__NOTYF.error("Valide que sus datos esten correctamente")
      },
      error: (e) => {
        console.error("Error en la petición:", e);
        this._SERVICE_HTTP.__NOTYF.error("Ocurrio un error al iniciar sesion.")  
      }
    });
  }
}