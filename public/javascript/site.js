if (typeof (catho) == 'undefined') catho = {};
$(function () {
    catho.chat.init();
})
catho.chat = {
    caixa: null,
    caixa_corpo: null,
    templateCanditato: null,
    templateRecrutador: null,
    ultimoUsuario: null,
    init: function () {
        var t = this;

        t.registerEvents(t);
        t.caixa = $('.caixa');
        t.caixa_corpo = catho.chat.caixa.find('.caixa-corpo');
        t.templateCanditato = $('#candidato');
        t.templateMsgCanditato = $('#candidato_menssagem');
        t.templateRecrutador = $('#recrutador');
        t.templateMsgRecrutador = $('#recrutador_menssagem');
        t.caixa.animate({ "bottom": "0" }, 2000, t.carregarCaixa);
    },
    registerEvents: function (t) {
        $('.enviar').click(t.aoEnviarMenssagem);
        $('.limpar').click(t.aoLimparMenssagem);
        $('.fechar').click(t.aoFechar);
        $('.minimizar').click(t.aoMinimizar);
        $('.restaurar').click(t.aoRestaurar);
    },
    carregarCaixa: function () {
        catho.chat.caixa.addClass('aberta');
        $.ajax({
            url: '/static/json/talk.json',
            //dataType:'json',
            success: function (ret) {
                if (ret.statusRequest) {
                    catho.chat.caixa_corpo.html('');
                    $(ret.talkMessages).each(function (i, it) {
                        setTimeout(function () {
                            if (it.user.perfilId == 1) {/*candidato*/
                                catho.chat.addMensagemCandidato(it)
                            } else {
                                catho.chat.addMensagemRecrutador(it);
                            }
                        }, 500 * i);
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
    addItem: function (it, template) {
        if (catho.chat.ultimoUsuario != it.user.id) {
            catho.chat.caixaMenssagens = $(template.html())
                .appendTo(catho.chat.caixa_corpo);
            catho.chat.caixaMenssagens.find('.foto')
                .attr('src', '/static/images/usuarios/' + it.user.id + '.gif')
        }
        catho.chat.ultimoUsuario = it.user.id;
    },
    addMensagemCandidato: function (canditatoObj) {
        catho.chat.addItem(canditatoObj, catho.chat.templateCanditato);

        var msg = $(catho.chat.templateMsgCanditato.html())
            .appendTo(catho.chat.caixaMenssagens.find('.mensagens'));
        msg.data('id', canditatoObj.id);
        msg.find('.mensagem').text(canditatoObj.message.message);
        msg.find('.icone').attr('src', '/static/images/' + (canditatoObj.message.alreadyRead ? '' : 'nao_') + 'lida.gif');
        msg.find('.hora').text('enviado ' +
            (canditatoObj.message.time
                ? 'as ' + moment(canditatoObj.message.time).format('HH:mm')
                : 'a poucos segundos'));

        catho.chat.scrollDown();
    },
    addMensagemRecrutador: function (recrutadorObj) {
        catho.chat.addItem(recrutadorObj, catho.chat.templateRecrutador);
        var msg = $(catho.chat.templateMsgRecrutador.html())
            .appendTo(catho.chat.caixaMenssagens.find('.mensagens'));
        msg.data('id', recrutadorObj.id);
        msg.find('.mensagem').text(recrutadorObj.message.message);
        msg.find('.nome').text(recrutadorObj.user.name);
        msg.find('.empresa').text(recrutadorObj.company.name);
        msg.find('.hora').text('enviado as ' + moment(recrutadorObj.message.time).format('HH:mm'));

        catho.chat.scrollDown();
    },
    scrollDown: function () {
        var h = 0;
        catho.chat.caixa_corpo.children().each(function () {
            h += $(this).height();
        })
        catho.chat.caixa_corpo.animate({ scrollTop: h }, 800);
    },
    aoEnviarMenssagem: function (e) {
        e.preventDefault();
        var txt = $('textarea').val();
        if(!txt || txt.trim().lenght === 0){
            $('textarea')[0].focus();
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
        catho.chat.addMensagemCandidato(data);
        $('textarea').val('');
        $.ajax({
            url: '/send.json',
            success: function (ret) {
                //TODO: terminar o retorno;
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
    aoLimparMenssagem: function (e) {
        e.preventDefault();
        $('textarea').val('');
    },
    aoFechar: function (e) {
        e.preventDefault();
        catho.chat.caixa.animate({ "bottom": '-' + catho.chat.caixa.height() +'px' }, 1000, function () {
            catho.chat.caixa_corpo.html('<span class="load"> carregando...</span>');
        });
    },
    aoMinimizar: function (e) {
        e.preventDefault();
        catho.chat.height = catho.chat.caixa.height() - catho.chat.caixa.find('.caixa-titulo').height()-16;
        catho.chat.caixa.animate({ 'bottom': '-'+ catho.chat.height +'px' }, 1000, function () {
            catho.chat.caixa.addClass('minizada');
            catho.chat.caixa.removeClass('aberta');
        });
    },
    aoRestaurar: function (e) {
        e.preventDefault();
        catho.chat.caixa.animate({ 'bottom': '0px' }, 1000, function () {
            catho.chat.caixa.removeClass('minizada');
            catho.chat.caixa.addClass('aberta');
        });
        
    }
}