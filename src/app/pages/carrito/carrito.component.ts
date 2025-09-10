import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  userData = {
    "success": true,
    "usuario": "Farruko",
    "carrito": {
      "Car_id": 1,
      "fecha_creacion": "2025-09-08 15:59:14",
      "estado": "activo"
    },
    "productos": [
      {
        "nombre_producto": "iphone10",
        "cantidad": 10,
        "precio_unitario": "$2.000.000",
        "subtotal": "$20.000.000"
      },
      {
        "nombre_producto": "iphone10",
        "cantidad": 100,
        "precio_unitario": "$1.000",
        "subtotal": "$100.000"
      },
      {
        "nombre_producto": "iphone10",
        "cantidad": 100,
        "precio_unitario": "$1.000",
        "subtotal": "$100.000"
      }
    ],
    "total_pagar": "$20.200.000"
  };

  dataResponseListCompras: any[] = [] 








}
