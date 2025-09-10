
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
 
  userForm: FormGroup;
  
  
  userData = {
    id: 136,
    username: 'luis felipe',
    phone: 30240191,
    email: 'luis@gmail.com',
    password: '123456'
  };

  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      
      id: [{ value: '', disabled: true }], 
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  
    this.userForm.patchValue(this.userData);
  }

  
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