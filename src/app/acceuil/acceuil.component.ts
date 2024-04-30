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


  listeArticles: Article[] = [];
  // article: any = "";


  ngOnInit() {
    this.refreshListeArticle();// refresh liste articles if the response serveur
  }

  refreshListeArticle() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      this.http
        .get<Article[]>('http://localhost/testangular/articles.php',{
          headers: { Authorization: jwt },
        })// permet de type 'Article []' in order to get the articles 
        
        .subscribe((resultat: Article[]) => { this.listeArticles = resultat; })
    } else {
      alert('Please provide a jwt token before creating a new article with this article type.'); //
    }



  }
  onSuppressionArticle(idArticle?: number) {
    this.http.delete('http://localhost/testangular/supprimer-article.php?id=' + idArticle)
      .subscribe((resultat) => this.refreshListeArticle());
    // this.listeArticles = this.listeArticles.filter((article) => article.id!= idArticle);
    // console.log(this.listeArticles);
    // console.log(idArticle);
  }
  // onModificationArticle(idArticle?: number) {
  //   this.http.get('http://localhost/testangular/articles.php?id=' + idArticle)
  //   .subscribe((resultat) => console.log(resultat));
  // }
  // onAjoutArticle() {
  //   this.http.get('http://localhost/testangular/articles.php')
  //   .subscribe((resultat) => console.log(resultat));


}


