import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../core/components/navbar/navbar.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherUsers } from '@ng-icons/feather-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Cambiado de ReactiveFormsModule a FormsModule
import { GlobalService } from '../../core/services/http.service';
import { environment as env } from '../../../environments/environment.development';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, FormsModule], // Cambiado ReactiveFormsModule por FormsModule
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  viewProviders: [provideIcons({ featherUsers })]
})
export class ProductosComponent implements OnInit {

  __GLOBAL_SERVICE = inject(GlobalService);

  dataResponseCategorias!: any[];
  dataReponseProductos!: any[];

  // Estados para los modales
  isOpenModalCrear = false;
  isOpenModalEditar = false;

  selectedIdx = 1;

  // Objeto para el producto nuevo (crear)
  nuevoProducto = {
    nombre: '',
    descripcion: '',
    category_id: '',
    cantidad: 0,
    price: 0
  };

  // Objeto para editar producto
  productoEditar = {
    id: '',
    nombre: '',
    descripcion: '',
    category_id: '',
    cantidad: 0,
    price: 0
  };

  constructor() {}

  goToCategorias() {
    this.selectedIdx = 2;
  }

  getCategorias(){
    this.__GLOBAL_SERVICE.__HTTP.get<any[]>(`${env.url}${env.port}/view/data`).subscribe({
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
    this.__GLOBAL_SERVICE.__HTTP.get<any[]>(`${env.url}${env.port}/view/data`).subscribe({
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
    this.__GLOBAL_SERVICE.__HTTP.delete(`${env.url}${env.port}/delete/${id}`).subscribe({
      next: (resp) => {
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto eliminado correctamente");
        this.getProductos(); // Actualizar la lista después de eliminar
      },
      error: (e) => {
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al eliminar el producto");
      }
    });
  }



  // Abrir modal de crear producto
  openCrearModal() {

    // Limpiar el formulario
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      category_id: '',
      cantidad: 0,
      price: 0
    };
    this.isOpenModalCrear = true;
  }

  // Cerrar modal de crear producto
  closeCrearModal() {
    this.isOpenModalCrear = false;
    // Limpiar el formulario
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      category_id: '',
      cantidad: 0,
      price: 0
    };
  }

  // Crear nuevo producto
  handleCrearProducto() {
    // Validaciones básicas
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.descripcion || 
        !this.nuevoProducto.category_id || this.nuevoProducto.cantidad <= 0 || 
        this.nuevoProducto.price <= 0) {
      this.__GLOBAL_SERVICE.__NOTYF.error("Por favor, complete todos los campos correctamente.");
      return;
    }

    const body = {
      name: this.nuevoProducto.nombre,
      description: this.nuevoProducto.descripcion,
      category_id: this.nuevoProducto.category_id,
      cant: this.nuevoProducto.cantidad,
      price: this.nuevoProducto.price
    };

    this.__GLOBAL_SERVICE.__HTTP.post(`${env.url}${env.port}/product/create`, body).subscribe({
      next: (resp) => {
        console.log(resp)
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto creado correctamente");
        this.getProductos(); // Actualizar la lista de productos
        this.closeCrearModal(); // Cerrar la modal después de crear
      },
      error: (err) => {
        console.log(err);
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al crear el producto intente de nuevo");
      }
    });
  }

  // =============== MÉTODOS PARA EDITAR PRODUCTO ===============

  // Abrir modal de editar y cargar los datos
  openEditarModal(item: any) {
    // Cargar los datos del producto en el objeto de edición
    this.productoEditar = {
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      category_id: item.categoria, 
      cantidad: item.cantidad,
      price: item.price
    };
    this.isOpenModalEditar = true;
  }

  // Cerrar modal de editar
  closeEditarModal() {
    this.isOpenModalEditar = false;
    // Limpiar el objeto de edición
    this.productoEditar = {
      id: '',
      nombre: '',
      descripcion: '',
      category_id: '',
      cantidad: 0,
      price: 0
    };
  }

  // Guardar cambios del producto editado
  handleSaveProducto() {
    // Validaciones básicas
    if (!this.productoEditar.nombre || !this.productoEditar.descripcion || 
        !this.productoEditar.category_id || this.productoEditar.cantidad <= 0 || 
        this.productoEditar.price <= 0) {
      this.__GLOBAL_SERVICE.__NOTYF.error("Por favor, complete todos los campos correctamente.");
      return;
    }

    const body = {
      id: this.productoEditar.id,
      name: this.productoEditar.nombre,
      description: this.productoEditar.descripcion,
      category_id: this.productoEditar.category_id,
      cant: this.productoEditar.cantidad,
      price: this.productoEditar.price
    };

    this.__GLOBAL_SERVICE.__HTTP.put(`${env.url}${env.port}/edit_product/`, body).subscribe({
      next: (resp) => {
        console.log(resp)
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto actualizado correctamente");
        this.getProductos(); 
        this.closeEditarModal(); 
      },
      error: (err) => {
        console.log(err);
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al actualizar el producto");
      }
    });
  }

  handleClickComprar(id: string) {
    // Lógica para comprar
    console.log('Comprar producto con ID:', id);
  }
}