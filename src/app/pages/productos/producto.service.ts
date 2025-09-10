import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = `${env.url}${env.port}`;
  private http = inject(HttpClient);

  constructor() { }

  getCategorias(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/category/view/data`);
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/product/view/data`);
  }

  createProducto(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/product/create`, body);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/product/delete/${id}`);
  }

  updateProducto(body: any): Observable<any> {
    return this.http.put(`${this.API_URL}/product/edit`, body);
  }
}