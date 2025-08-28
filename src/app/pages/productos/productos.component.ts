import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../core/components/navbar/navbar.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherUsers } from '@ng-icons/feather-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../core/services/http.service';


@Component({
  selector: 'app-productos',
  imports: [NavbarComponent, NgIcon, CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  viewProviders: [provideIcons({featherUsers})]
})
export class ProductosComponent {

  __GLOBAL_SERVICE = inject(GlobalService)

  dataResponseCategorias! : any
  dataReponseProductos!: any

  selectedIdx = 1

  goToCategorias (){
    this.selectedIdx = 2
  }

  goToProductos (){
    this.selectedIdx = 1
  }


  getProductos(){
    this.__GLOBAL_SERVICE.__HTTP.get("http://127.0.0.1:8000/view_product/data").subscribe({
      next: (resp) => {
        this.dataReponseProductos = resp
      }, error: (e) => {
        console.log(e)
      }
    })
  }

  ngOnInit(): void {
    this.getProductos()
    
  }



}
