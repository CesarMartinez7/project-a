import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  __HTTP = inject(HttpClient)
  __ROUTER = inject(Router)

  __NOTYF = new Notyf();
  constructor() { }
}
