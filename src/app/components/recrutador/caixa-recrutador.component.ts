import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { IMessageTalk } from '../../interfaces/iMessageTalk';

@Component({
  selector: 'recrutador',
  template: `
  <div class="caixa-recrutador">
    <div class="wrapper">
        <img class="foto" [src]="'/assets/images/usuarios/' + model[0].user.id + '.gif'"/>
        <div class="mensagens">
          <mensagem-candidato *ngFor="let msg of model" [model]="msg"></mensagem-candidato>
        </div>
    </div>
   </div>`,
  styleUrls: ['../comum.css','./caixa-recrutador.component.css']
})
export class CaixaRecrutadorComponent  implements OnInit, OnDestroy { 
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