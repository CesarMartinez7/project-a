import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  __HTTP = inject(HttpClient)
  __ROUTER = inject(Router)

  constructor() { }
}
