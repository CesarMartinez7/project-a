import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../core/components/navbar/navbar.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherUsers } from '@ng-icons/feather-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../core/services/http.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true, // Se cambió a standalone
  imports: [NavbarComponent, NgIcon, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  viewProviders: [provideIcons({ featherUsers })]
})
export class ProductosComponent implements OnInit {

  __GLOBAL_SERVICE = inject(GlobalService);

  dataResponseCategorias!: any;
  dataReponseProductos!: any;

  isOpenModalEditar = false;

  currentId = null

  selectedIdx = 1;
  
  // El formulario ahora tiene todos los campos del producto
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      id: [{ value: '', disabled: true }], // El ID del producto, deshabilitado para no ser editable
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  goToCategorias() {
    this.selectedIdx = 2;
  }


  getCategorias(){
    this.__GLOBAL_SERVICE.__HTTP.get("http://127.0.0.1:8000/view_category/data").subscribe({
      next: (resp) => {
        this.dataResponseCategorias = resp
      },error: (err) => {
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al obtener las categorias")
      }
    })
  }
  
  goToProductos() {
    this.selectedIdx = 1;
  }

  getProductos() {
    this.__GLOBAL_SERVICE.__HTTP.get("http://127.0.0.1:8000/view_product/data").subscribe({
      next: (resp) => {
        this.dataReponseProductos = resp;
        console.log(this.dataReponseProductos)
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
    this.getCategorias()
    this.getProductos();
  }

  handleClickDeleteProducto(id: string) {
    this.__GLOBAL_SERVICE.__HTTP.delete(`http://127.0.0.1:8000/delete/${id}`).subscribe({
      next: (resp) => {
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto eliminado correctamente");
        this.getProductos(); // Actualizar la lista después de eliminar
      },
      error: (e) => {
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al eliminar el producto");
      }
    });
  }

   formFields = [
    {
      name: "id",
      placeholder: "Ingrese el ID",
      controlName: "id"
    },
    {
      name: "nombre",
      placeholder: "Ingrese el nombre",
      controlName: "nombre"
    },
    {
      name: "descripcion",
      placeholder: "Ingrese la descripción",
      controlName: "descripcion"
    },
    {
      name: "category_id",
      placeholder: "Ingrese la categoría",
      controlName: "categoria"
    },
    {
      name: "cantidad",
      placeholder: "Ingrese la cantidad",
      controlName: "cantidad"
    },
    {
      name: "precio",
      placeholder: "Ingrese el precio",
      controlName: "precio"
    }
  ];
  
  
  // Nuevo método para abrir la modal y cargar los datos
  openEditarModal(item: any) {

    this.currentId = item.id

    // Rellenar el formulario con los datos del producto seleccionado
    this.form.patchValue({
      id: item.id,
      nombre: item.nombre,
      description: item.description,
      categoria: item.categoria,
      cantidad: item.cantidad,
      precio: item.precio
    });
    this.isOpenModalEditar = true;
  }

  // Método para cerrar la modal sin guardar
  closeEditarModal() {
    this.isOpenModalEditar = false;
    this.form.reset(); // Opcional: limpiar el formulario al cerrar
  }

  // Método para guardar los cambios del formulario
  handleSaveProducto() {
    // El ID del producto lo obtenemos del formulario
    const productId = this.form.get('id')?.value;
    const body = this.form.getRawValue(); // Usa getRawValue para incluir campos deshabilitados (como el ID)
    
    // Validar el formulario antes de enviar
    if (this.form.invalid) {
      this.__GLOBAL_SERVICE.__NOTYF.error("Por favor, complete todos los campos requeridos.");
      return;
    }

    this.__GLOBAL_SERVICE.__HTTP.post(`http://127.0.0.1:8000/edit_product/${productId}`, body).subscribe({
      next: (resp) => {
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto actualizado correctamente");
        this.getProductos(); // Actualizar la lista de productos
        this.closeEditarModal(); // Cerrar la modal después de guardar
      },
      error: (err) => {
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al actualizar el producto");
      }
    });
  }
  

  handleClickComprar(id: string) {
    // Lógica para comprar
  }
}
