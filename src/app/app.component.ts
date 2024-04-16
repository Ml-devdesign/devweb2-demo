import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AcceuilComponent } from "./acceuil/acceuil.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, RouterLink, RouterLinkActive]//ont a retireer le acceuilComponent pour le routeurLink
})
export class AppComponent {
  title = 'devweb2-demo';
}
