import { HttpClient, HttpClientModule } from "@angular/common/http"
import { Component, inject } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { Article } from "../models/Article.type";

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {
  //Objet
  http: HttpClient = inject(HttpClient)


  listeArticles: Article[] = [
    {
      nom:"",
      prix:42,
      image:"",
      description:""
    }
  ]

  ngOnInit() {  
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.http
      .get<Article[]>('http://localhost/testangular/articles.php')
        .subscribe((resultat: Article[]) => { this.listeArticles = resultat; })
  }
}


