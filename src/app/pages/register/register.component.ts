import { Component, inject } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormBuilder,FormGroup, Form} from '@angular/forms';
import { Validators } from '@angular/forms';
import {featherUser, featherUserPlus} from "@ng-icons/feather-icons"
import { NgIcon, provideIcons } from '@ng-icons/core';
import { GlobalService } from '../../core/services/http.service';

@Component({
  selector: 'app-register',
  imports: [NgIcon,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  viewProviders: [provideIcons({featherUser, featherUserPlus})]
})
export class RegisterComponent {


  form: FormGroup

  __GLOBAL_SERVICE = inject(GlobalService)

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      cedula: "104314886",
      nombre: "cesar",
      telefono: "3215668657",
      correo: "cesarwamartinez@gmail.com",
      contraseña: "1043134886"
    })

  }

  handleSubmitForm(){

    if(this.form.invalid){
      alert("Confirma que tus datos esten correctamente")
      return
    }

    const body = {
      id : this.form.get("cedula")?.value,
      username: this.form.get("nombre")?.value,
      phone: this.form.get("telefono")?.value,
      email: this.form.get("correo")?.value,
      password: this.form.get("contraseña")?.value
    }

    console.log(body)

    this.__GLOBAL_SERVICE.__HTTP.post("http://127.0.0.1:8000/register", body).subscribe({
      next: (e) => {
        console.log(e)
        alert("Usuario registrado exitosamente ")
        this.__GLOBAL_SERVICE.__ROUTER.navigateByUrl("/login")

      }, error: (e) => {
        alert(`ocurrio un error ${e}`)
      }
    })



  }

}
