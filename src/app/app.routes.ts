import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PageNonTrouveComponent } from './page-non-trouve/page-non-trouve.component';

export const routes: Routes = [
    { path: 'acceuil' , component : AcceuilComponent},
    {  path: 'connexion', component : ConnexionComponent},
    {  path: '', redirectTo : 'acceuil', pathMatch : 'full'},//configuration doc angular
    {  path: '**', component : PageNonTrouveComponent}//ajouter un templat pour la page non trouver n'import quels caractere nimporte quoi 

];
