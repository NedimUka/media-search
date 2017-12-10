import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MediaComponent } from './media.component.main';
import { ResultsComponent } from './media.component.results';
import { ResultsService } from './media.service.results';
import { AppComponent } from './media.component.app';

const appRoutes: Routes = [
  { path: 'main', component: MediaComponent },
  { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, MediaComponent, ResultsComponent],
  providers: [ResultsService],
  bootstrap: [AppComponent]
})
export class MediaModule { }
