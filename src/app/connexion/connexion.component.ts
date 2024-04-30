import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, FormsModule, ReactiveFormsModule, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',

})

export class ConnexionComponent {
  generateurFormulaire: FormBuilder = inject(FormBuilder)
  http: HttpClient = inject(HttpClient);

  formulaire: FormGroup = this.generateurFormulaire.group({
    email: ['', [Validators.required, Validators.email]], // Champ email avec validation requise et validator.email d'une adress email valide requise possibilité d'ajouter le pattern
    password: ['', [Validators.required]] // Champ password avec validation requise
  });


  onConnexion() {
    if (this.formulaire.valid) {
      this.http.post<any>(
        'http://testangular/connexion.php',
        this.formulaire.value)

        .subscribe((resultat) => localStorage.setItem('jwt', resultat.jwt))

    }
    //   console.log('Formulaire Valide. Connexion en cours...');// Affichage d'un message dans la console lors de la connexion
    //   console.log(this.formulaire.value);
    // } else {
    //   console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
  }
}


