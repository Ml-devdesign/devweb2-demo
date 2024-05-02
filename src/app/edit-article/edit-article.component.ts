import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { Article } from '../models/Article.type';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule
  ],

  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})
export class EditArticleComponent {

  fichierSelectionne: File | null = null;

  prixMinimum: number = 0.01;//bloque la valeur minimale du prix dans le formulaire

  http: HttpClient = inject(HttpClient);

  formBuilder: FormBuilder = inject(FormBuilder);//création formulaire

  router: Router = inject(Router); //redirection de page

  route: ActivatedRoute = inject(ActivatedRoute);//informations sur la route actuelle


  formulaire: FormGroup = this.formBuilder.group({
    nom: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ["", []],
    prix: [1, [Validators.required, Validators.min(this.prixMinimum)]],

  });

  id: number | null = null; //
  urlImage: string | null = null; //
  imageSupprime: boolean = false; //
  miniature: string | null = null; //

  ngOnInit() {
    this.route.params.subscribe((parametresUrl) => {
      //si le paramètre id existe 
      if (parametresUrl["id"]) {
        //si le paramètres est un nombre
        if (!isNaN(parametresUrl["id"])) {
          this.id = parametresUrl["id"];


          this.http.get<Article>(
            // http://localhost/testangular/article.php?id=' + id ;
            `http://localhost/testangular/article.php?id=${this.id}`
          )
            .subscribe(article => {
              this.formulaire.patchValue(article)
              this.urlImage = article.image;
            });
          console.log(this.id + " c'est une modification2")

        } else {
          alert(parametresUrl["id"] + " n'est pas un identifiant valide !");
        }
      } else {
        console.log("c'est un ajout")
      }
    });
  }

  onSubmit() {
    if (this.formulaire.valid) {

      const jwt = localStorage.getItem('jwt');

      if (jwt != null) {

        const donnees: FormData = new FormData();

        const article = this.formulaire.value;
        article.imageSupprime = this.imageSupprime;

        donnees.append('article', JSON.stringify(article));

        if (this.fichierSelectionne) {
          donnees.append('image', this.fichierSelectionne);
        }
        console.log("Soumission Formulaire");

        const url = this.id == null ?
          "http://testangular/ajout-articles.php" : `http://testangular/modifier-article.php?id=${this.id}`;

        this.http
          .post(
            url,
            donnees, {
            headers: { Authorization: jwt },
          })
          .subscribe({
            next: (resultat) => this.router.navigateByUrl('/acceuil'),
            error: (resultat) =>
              alert(
                resultat.error.message
                  ? resultat.error.message
                  : 'Erreur inconnue, contactez votre administrator'
              ),
          });
      } else {
        alert('Vous devez être connecté pour effectuer cette action');
        return;
      }
    }
  }
  onFichierSelectionne(evenement: any) {
    this.fichierSelectionne = evenement.target.files[0];
    console.log(this.fichierSelectionne);//verification console
    this.urlImage = null;
    //affectation sur l'événement en valeur null
    evenement.target.value = null;

    //récupére le fichier sous condition et transformation en url
    //affectation a miniature
    if (this.fichierSelectionne != null) {
      //recupération => miniature
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.miniature = e.target.result;
      };
      reader.readAsDataURL(this.fichierSelectionne);
    }
  }

  onSuppressionImage() {
    if (this.urlImage != null) {
      this.imageSupprime = true;
    }
    this.urlImage = null;
    this.fichierSelectionne = null;
    this.miniature = null;
  }
}


