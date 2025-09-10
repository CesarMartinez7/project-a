// Importa los módulos necesarios para crear un formulario reactivo
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class UserFormComponent implements OnInit {
  // Define la estructura del formulario
  userForm: FormGroup;
  
  // Datos de ejemplo para mapear
  userData = {
    id: 136,
    username: 'luis felipe',
    phone: 30240191,
    email: 'luis@gmail.com',
    password: '123456'
  };

  // Inyecta el FormBuilder para construir el formulario
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      // Define cada campo con sus validadores
      id: [{ value: '', disabled: true }], // El ID está deshabilitado para que no se pueda editar
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Valida que solo sean números
      email: ['', [Validators.required, Validators.email]], // Valida el formato de correo
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Cuando el componente se carga, mapea los datos al formulario
    this.userForm.patchValue(this.userData);
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulario enviado:', this.userForm.value);
      alert('Formulario enviado correctamente!');
    } else {
      console.log('El formulario no es válido.');
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}