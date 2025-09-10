import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherShoppingCart, featherUsers } from '@ng-icons/feather-icons';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [NgIcon, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  viewProviders: [provideIcons({featherUsers, featherShoppingCart})]
})
export class NavbarComponent {


  


}
