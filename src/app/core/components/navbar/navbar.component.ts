import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherShoppingCart, featherUsers } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  viewProviders: [provideIcons({featherUsers, featherShoppingCart})]
})
export class NavbarComponent {

}
