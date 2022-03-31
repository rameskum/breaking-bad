import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharactersComponent} from "./components/characters/characters.component";

const routes: Routes = [
  {
    path: 'characters',
    component: CharactersComponent
  },
  {path: '', redirectTo: 'characters', pathMatch: 'full'},
  {path: '**', redirectTo: 'characters'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
