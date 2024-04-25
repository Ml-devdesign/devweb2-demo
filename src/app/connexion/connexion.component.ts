import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card'; 
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule, MatCardModule, FormsModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})

export class ConnexionComponent {

  formulaire: FormGroup; // Déclaration de la variable formulaire de type FormGroup

  constructor(private generateurFormulaire: FormBuilder) { // Constructeur avec injection de dépendance pour le FormBuilder
    // Initialisation du formulaire avec FormBuilder
    this.formulaire = this.generateurFormulaire.group({
      email: ['',[Validators.required,Validators.email]], // Champ email avec validation requise et validator.email d'une adress email valide requise possibilité d'ajouter le pattern
      password: ['',[Validators.required]] // Champ password avec validation requise
    });
  }

  onConnexion() {
    if (this.formulaire.valid) {
      console.log('Formulaire Valide. Connexion en cours...');// Affichage d'un message dans la console lors de la connexion
      console.log(this.formulaire.value);
    } else {
      console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
    }
  }

}
