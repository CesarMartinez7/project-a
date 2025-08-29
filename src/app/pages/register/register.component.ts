import { Component, inject } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Form,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { featherUser, featherUserPlus } from '@ng-icons/feather-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { GlobalService } from '../../core/services/http.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  viewProviders: [provideIcons({ featherUser, featherUserPlus })],
})


export class RegisterComponent {
  form: FormGroup;

  __GLOBAL_SERVICE = inject(GlobalService);

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  handleSubmitForm() {
    if (this.form.invalid) {
      alert('Confirma que tus datos esten correctamente');
      return;
    }

    const body = {
      id: this.form.get('cedula')?.value,
      username: this.form.get('nombre')?.value,
      phone: this.form.get('telefono')?.value,
      email: this.form.get('correo')?.value,
      password: this.form.get('contraseña')?.value,
    };

    

    this.__GLOBAL_SERVICE.__HTTP
      .post('http://127.0.0.1:8000/register', body)
      .subscribe({
        next: (e) => {
          this.__GLOBAL_SERVICE.__NOTYF.success("uSUARIO REGISTRADO EXITOSAMENTE")
          this.__GLOBAL_SERVICE.__ROUTER.navigateByUrl('/login');
        },
        error: (e) => {
          this.__GLOBAL_SERVICE.__NOTYF.success("Ocurrio un error al registrar usuario")
        },
      });
  }
}
