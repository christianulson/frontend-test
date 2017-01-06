import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { 
  MessageFactoryDirective, 
  CaixaComponent,
  CaixaCandidatoComponent,
  MensagemCandidatoComponent,
  CaixaRecrutadorComponent,
  MensagemRecrutadorComponent
} from './components/';

import { TalksService } from './services/talks.service';

import { TimePipe } from './pipes/timePipe';

const SERVICES = [
  TalksService
];

const PIPES = [
  TimePipe
];

@NgModule({
  imports: [
    BrowserModule, HttpModule
  ],
  declarations: [
    ...PIPES,
    MessageFactoryDirective,
    CaixaComponent,
    CaixaCandidatoComponent,
    MensagemCandidatoComponent,
    CaixaRecrutadorComponent,
    MensagemRecrutadorComponent,
    AppComponent
  ],
  exports: [
    ...PIPES
  ],
  providers: [
    ...SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
