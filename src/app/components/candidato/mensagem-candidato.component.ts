import { Component, Input } from '@angular/core';
import { IMessageTalk } from '../../interfaces/iMessageTalk';

@Component({
  selector: 'mensagem-candidato',
  template: `
        <div class="item">
            <span class="seta"></span>
            <img class="icone" [src]="'/assets/images/' + (model.message.alreadyRead ? '' : 'nao_') + 'lida.gif'"/>
            <span class="mensagem">{{model.message.message}}</span>
            <span class="usuario">
                <span class="nome">Você</span>
                <span class="hora">{{model.message.time|timePipe: 'HH:mm'}}</span>
            </span>
         </div>`,
  styleUrls: ['../comum.css', './mensagem-candidato.component.css']
})
export class MensagemCandidatoComponent { 
    @Input() model: IMessageTalk;
}
