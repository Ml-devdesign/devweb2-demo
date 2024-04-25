import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

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

  prixMinimum: number = 0.02;

  http: HttpClient = inject(HttpClient)
  formBulder: FormBuilder = inject(FormBuilder);

  formulaire: FormGroup = this.formBulder.group({
    nom: ['',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', []],
    prix: [1, [Validators.required, Validators.min(this.prixMinimum)]],
  });
  onSubmit() {
    if (this.formulaire.valid) {
      const donnees: FormData = new FormData();
      donnees.append('article', JSON.stringify(this.formulaire.value));

      if (this.fichierSelectionne) {
        donnees.append('image', this.fichierSelectionne);
      }

      this.http
        .post('http://localhost/testangular/ajout-articles.php', donnees)
        .subscribe({
          next: (resultat) => console.log(resultat),
          error: (resultat) =>
            alert(
              resultat.error.message
                ? resultat.error.message
                : 'Erreur inconnue, contactez votre administrator'
            ),
        });
    }
  }
  onFichierSelectionne(evenement: any) {
    this.fichierSelectionne = evenement.target.files[0];
    // console.log(this.fichierSelectionne);
  }
}


