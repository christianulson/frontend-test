import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { IMessageTalk } from '../../interfaces/iMessageTalk';
import { MensagemCandidatoComponent } from './mensagem-candidato.component';

@Component({
  selector: 'candidato',
  template: `
  <div class="caixa-canditato">
      <div class="wrapper">
          <div class="mensagens">
            <mensagem-candidato *ngFor="let msg of model" [model]="msg"></mensagem-candidato>
          </div>
          <img class="foto" [src]="'/assets/images/usuarios/' + model[0].user.id + '.gif'"/>
      </div>
    </div>`,
  styleUrls: ['../comum.css','./caixa-candidato.component.css']
})
export class CaixaCandidatoComponent implements OnInit, OnDestroy { 
  @Input() model: IMessageTalk[];

  constructor() {
  }

  ngOnInit() {
    console.log('OnInit');
  }

  ngOnDestroy() {
    console.log('Destroy Called');
  }
}