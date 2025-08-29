import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-angulos-suwa';

}
