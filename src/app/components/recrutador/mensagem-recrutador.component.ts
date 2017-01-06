import { Component, Input } from '@angular/core';
import { IMessageTalk } from '../../interfaces/IMessageTalk';

@Component({
  selector: 'mensagem-recrutador',
  template: `
        <div class="item">
            <span class="seta"></span>
            <div class="wraper2">
                <span class="mensagem">{{model.message.message}}</span>
                <span class="usuario">
                    <span class="nome">{{model.user.name}}</span>
                    <span class="empresa">{{model.company.name}}</span>
                    <span class="hora">{{model.message.time|timePipe: 'HH:mm'}}</span>
                </span>
            </div>
         </div>`,
  styleUrls: ['../comum.css','./mensagem-recrutador.component.css']
})
export class MensagemRecrutadorComponent { 
    @Input() model: IMessageTalk;
}
