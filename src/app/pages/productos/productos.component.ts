import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../core/components/navbar/navbar.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus, featherUsers, featherX } from '@ng-icons/feather-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../core/services/http.service';
import { JsonPipe } from '@angular/common';
import { SkeletonTableComponent } from '../../core/components/skeleton-table/skeleton-table.component'
import { ProductService } from './producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, FormsModule, JsonPipe, SkeletonTableComponent, NgIcon],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  viewProviders: [provideIcons({ featherUsers, featherPlus, featherX })]
})
export class ProductosComponent {

  __GLOBAL_SERVICE = inject(GlobalService);
  
  private productService = inject(ProductService);

  isLoading = false;

  dataResponseCategorias: any[] = [];
  dataReponseProductos: any[] = [];

  isOpenModalCrear = false;
  isOpenModalEditar = false;
  selectedIdx = 1;

  nuevoProducto = {
    nombre: '',
    descripcion: '',
    category_id: '',
    cantidad: 0,
    price: 0
  };

  productoEditar = {
    id: '',
    nombre: '',
    descripcion: '',
    category_id: '',
    cantidad: 0,
    price: 0
  };

  constructor() {}

  ngOnInit(): void {
    this.fetchCategorias();
    this.fetchProductos();
  }
  

  goToCategorias() {
    this.selectedIdx = 2;
  }

  goToProductos() {
    this.selectedIdx = 1;
  }

  fetchCategorias() {
    this.productService.getCategorias().subscribe({
      next: (resp) => {
        this.dataResponseCategorias = resp.data;
      },
      error: (err) => {
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al obtener las categorías");
      }
    });
  }

  fetchProductos() {
    this.isLoading = true;
    this.productService.getProductos().subscribe({
      next: (resp) => {
        this.isLoading = false;
        this.dataReponseProductos = resp;
        console.log(this.dataReponseProductos);
      },
      error: (e) => {
        this.isLoading = false;
        console.log(e);
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al obtener los productos");
      },
    });
  }

  handleClickDeleteProducto(id: string) {
    this.productService.deleteProducto(id).subscribe({
      next: () => {
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto eliminado correctamente");
        this.fetchProductos();
      },
      error: (e) => {
        console.error(e);
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al eliminar el producto");
      }
    });
  }

  openCrearModal() {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      category_id: '',
      cantidad: 0,
      price: 0
    };
    this.isOpenModalCrear = true;
  }

  closeCrearModal() {
    this.isOpenModalCrear = false;
  }

  handleCrearProducto() {
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

    this.productService.createProducto(body).subscribe({
      next: () => {
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto creado correctamente");
        this.fetchProductos();
        this.closeCrearModal();
      },
      error: (e) => {
        console.error(e);
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al crear el producto, intente de nuevo");
      }
    });
  }

  
  openEditarModal(item: any) {
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

  closeEditarModal() {
    this.isOpenModalEditar = false;
  }

  handleSaveProducto() {
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

    this.productService.updateProducto(body).subscribe({
      next: () => {
        this.__GLOBAL_SERVICE.__NOTYF.success("Producto actualizado correctamente");
        this.fetchProductos();
        this.closeEditarModal();
      },
      error: (e) => {
        console.error(e);
        this.__GLOBAL_SERVICE.__NOTYF.error("Error al actualizar el producto");
      }
    });
  }

  handleClickComprar(id: string) {
    console.log('Comprar producto con ID:', id);
  }
}