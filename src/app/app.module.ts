import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbActionsModule, NbBadgeModule,
  NbCardModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {CharactersComponent} from './components/characters/characters.component';
import {HttpClientModule} from "@angular/common/http";
import { CharacterComponent } from './components/character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbCardModule,
    HttpClientModule,
    NbSpinnerModule,
    NbToastrModule.forRoot(),
    NbBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
