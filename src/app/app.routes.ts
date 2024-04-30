import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PageNonTrouveComponent } from './page-non-trouve/page-non-trouve.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

export const routes: Routes = [
    { path: 'acceuil', component: AcceuilComponent },
    { path: 'connexion', component: ConnexionComponent },

    { path: 'ajout-article', component: EditArticleComponent },
    { path: 'modifier-article/:id', component: EditArticleComponent },

    { path: '', redirectTo: 'acceuil', pathMatch: 'full' },//configuration doc angular
    { path: '**', component: PageNonTrouveComponent }//Ajouter un modèle pour la page non trouvée, ** avec n'importe quels caractères ou n'importe quoi.

];
