import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TalksService } from '../../services/talks.service';
import { ITalk } from '../../interfaces/iTalk';
import { IMessageTalk } from '../../interfaces/iMessageTalk';
declare var $:JQueryStatic;

@Component({
  selector: 'caixa-popup',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements AfterViewInit  { 
  @ViewChild('caixa') caixa:ElementRef;
  @ViewChild('caixacorpo') caixa_corpo:ElementRef;

  private lastIdUser:number;
  private height:number;
  private lastTalk:ITalk;

  public talks:ITalk[]=[];
  

  constructor(private talkService: TalksService) {
  
  }

  // Events
  ngAfterViewInit() {
    var that = this;
    $(this.caixa.nativeElement).animate({ "bottom": "0" }, 2000, function(){
      that.getTalks();
    });
    //this.getTalks();
  }

  private onEnviar(textarea){
    var txt = textarea.value;
        if(!txt || txt.trim().lenght === 0){
            textarea.focus();
            return;
        }
        txt = txt.trim();
        var data = { //Preencher com os dados do usuário
            user: {
                id: 9483484,
                perfilId: 1,
                name: "Nome do Candidato"
            },
            message: {
                time: false,
                alreadyRead: false,
                message: txt
            }
        }
        this.AddMensagem(data, false);
        textarea.value = '';
        //TODO: send to server
  }

  private onLimpar(textarea){
    textarea.value = '';
  }

  private onRestaurar(ev){
    var cx = $(this.caixa.nativeElement);
    cx.animate({ 'bottom': '0px' }, 1000, function () {
        cx.removeClass('minizada');
        cx.addClass('aberta');
    });
  }

  private onMinimizar(ev){
    var cx = $(this.caixa.nativeElement);
    var that = this;
    this.height = cx.height() - cx.find('.caixa-titulo').height()-16;
    cx.animate({ 'bottom': '-'+ that.height +'px' }, 1000, function () {
        cx.addClass('minizada');
        cx.removeClass('aberta');
    });
  }

  private onFechar(ev){
    var cx = $(this.caixa.nativeElement);
    var that = this;
    cx.animate({ "bottom": '-' + cx.height() +'px' }, 1000, function () {
          that.talks = [];
    });
  }

  // Methods
  private getTalks() {
    this.talkService.getTalk()
      .subscribe((ret: ITalk) => {
        if(ret && ret.talkMessages){
          const that = this;
          let i = 0;
          for (let msg of ret.talkMessages) {
            setTimeout(function () {
              that.AddMensagem(msg, ret.statusRequest);
            }, 500 * i);
            i++;
          }
        }else{
          console.log(ret);
        }
      },
      error => {
        console.log(error);
        // TODO: Implement NotificationService
      });
  }

  private AddMensagem(msg, status){
    if(msg.user.id != this.lastIdUser) {
        this.lastTalk = {
          statusRequest: status,
          talkMessages: [],
          type: msg.user.perfilId == 1 ? 'candidato':'recrutador'
        };
        this.talks.push(this.lastTalk);
      }
      this.lastTalk.talkMessages.push(msg);
      this.lastIdUser = msg.user.id;
      this.scrollDown();
  }

  private scrollDown() {
    var h = 0;
    var cc = $(this.caixa_corpo.nativeElement);
    cc.children().each(function () {
        h += $(this).height();
    })
    cc.animate({ scrollTop: h }, 800);
  }
}
