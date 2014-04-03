function Sair() {

            var page1Div = $('.page1').css('display', 'none');
            var page2Div = $('.page2').css('display', 'normal');

        }

        function Logar() {
		
			var login = $('#_txtLogin').val();
			var senha = $('#_txtSenha').val();

			if ((login == '') || (senha == ''))
			{
			    AvisoLogin();
			    return false;
			}

			txtxml = '<?xml version="1.0" encoding="utf-8"?> '+ 
                ' <Table1> '+
        ' <id_pessoa>164</id_pessoa> '+
        ' <nome>Valdir Lopes Viana</nome> '+
        ' <apelido>Valdir VIana</apelido> '+
        ' <classificacao>12</classificacao> '+
        ' <telefone_01>0000-0000</telefone_01> '+
        ' <usuario>1</usuario> '+
        ' <login>valdir</login> '+
       ' <senha>123valdir</senha> '+
      '</Table1>';

            var data = $.parseXML (txtxml)


           





    //$.ajax({
    //    type: 'POST',
    //    url: 'http://www.portalgecel.com.br/Services/UsuarioService.asmx/BuscaLoginUsuario',
    //    data: "login=" + login + "&senha=" + senha,
    //    dataType: 'xml',
    //    success: function (data) {

            var dt = $(data).find('Table1');
            
            var id_pessoa = dt.find('id_pessoa').text();
            var nome = dt.find('nome').text();
            var login = dt.find('login').text();
            var senha = dt.find('senha').text();
            var classificacao = dt.find('classificacao').text();

            if (nome == "")
            {
                alert('Erro! Usuário ou Senha Inválido!');
            }
            else
            {
                
                var page2Div = $('.page2').css('display', 'none');
                var page1Div = $('.page1').css('display', 'normal');

                MostraCelulaUsuario();

                //alert(login);
            }      
        //},
        //complete: function (data) {

        //    //document.getElementById('_txtSenha').value = "";

        //},
        //error: function (data) {

        //    alert("Erro! Ocorreu algum problema, se o problema persistir acesse, www.portalgecel.com.br");
        //}
        //});

        }


        function MostraCelulaUsuario() {

            var celulaUsuario = $.parseXML('<?xml version="1.0" encoding="utf-8"?><Table1> <id_celula>148</id_celula><nome>Luz na Escuridão</nome> </Table1>');

            var html = "";

            $(celulaUsuario).find('Table1').each(function () {

                var id_celula = $(this).find('id_celula').text();
                var nomeCelula = $(this).find('nome').text();

                html = html + '' +
                    '<div class="row-fluid">' +
                    '   <div class="span12">' +
                    '       <div class="control-group">' +
                    '          <div class="controls">' +
                    '              <button onclick="EscolheCelula()" class="btn btn-large btn-block _btnEscolhaCelula" value="' + id_celula + '"><strong>' + nomeCelula + '</strong></button>' +
                    '           </div>' +
                    '       </div>' +
                    '  </div>' +
                    '</div>';
            });

             
           

            $("input").val('');

            document.getElementById('_divEscolhaCelula').innerHTML = html;


            $('#_modalCelulas').modal({
                keyboard: false,
                backdrop: 'static'
            })

            $('#_modalCelulas').modal('show');

            

        }

        function EscolheCelula() {

            $('#_modalCelulas').modal('hide');

        }


        function EnviarRelatorio() {

            var membro = $('#_txtMembro').val();
            var visita = $('#_txtVisita').val();
            var crianca = $('#_txtCrianca').val();
            var total = $('#_txtTotal').val();
            var mda = $('#_txtMDA').val();
            var ge = $('#_txtGE').val();
            var batismo = $('#_txtBatismo').val();
            var kgAmor = $('#_txtKgAmor').val();
            var dtCelula = $('#_txtDtCelula').val();
            var dtMult = $('#_txtDtMultiplicacao').val();
            var Observacao = $('#_txtObservacao').val();

            if (VerificaVazios())
            {

                $('#_modalSucessoCadastro').modal({
                    keyboard: false,
                    backdrop: 'static'
                })

                $('#_modalSucessoCadastro').modal('show');
            }
            else
            {
                
            }


        }

        function SomaTotal() {

            var membro = $('#_txtMembro').val();
            var visita = $('#_txtVisita').val();
            var crianca = $('#_txtCrianca').val();

            if ((membro != "") && (visita != "") && (crianca != ""))
            {
                var total = parseInt(membro) + parseInt(visita) + parseInt(crianca);
                $('#_txtTotal').val(total);
            }        

        }

        function VerificaVazios()
        {
            var membro = $('#_txtMembro').val();
            var visita = $('#_txtVisita').val();
            var crianca = $('#_txtCrianca').val();
            var total = $('#_txtTotal').val();
            var mda = $('#_txtMDA').val();
            var ge = $('#_txtGE').val();
            var batismo = $('#_txtBatismo').val();
            var kgAmor = $('#_txtKgAmor').val();
            var dtCelula = $('#_txtDtCelula').val();
            var dtMult = $('#_txtDtMultiplicacao').val();
            var Observacao = $('#_txtObservacao').val();

            if (membro == '')
            {
                //alert('Campo MEMBRO deve ser preenchido!');
                AvisoVazio('MEMBRO');
                return false;
            }
            if (visita == '')
            {
                //alert('Campo VISITA deve ser preenchido!');
                AvisoVazio('VISITA');
                return false;
            }
            if (crianca == '')
            {
                //alert('Campo CRIANÇA deve ser preenchido!');
                AvisoVazio('CRIANÇA');
                return false;
            }
            if (total == '')
            {
                //alert('Campo TOTAL deve ser preenchido!');
                AvisoVazio('TOTAL');
                return false;
            }
            if (mda == '')
            {
                //alert('Campo MDA deve ser preenchido!');
                AvisoVazio('MDA');
                return false;
            }
            if (ge == '')
            {
                //alert('Campo GE deve ser preenchido!');
                AvisoVazio('GE');
                return false;
            }
            if (batismo == '')
            {
                //alert('Campo BATISMO deve ser preenchido!');
                AvisoVazio('BATISMO');
                return false;
            }
            if (kgAmor == '')
            {
                //alert('Campo KG AMOR deve ser preenchido!');
                AvisoVazio('KG AMOR');
                return false;
            }
            if (dtCelula == '')
            {
                //alert('Campo DATA CÉLULA deve ser preenchido!');
                AvisoVazio('DATA CÉLULA');
                return false;
            }

            return true;
        }

        function FecharSucessoEnvio()
        {
            $('#_modalSucessoCadastro').modal('hide');
            Sair();
        }

        function AvisoVazio(campo)
        {
            $("#_lblAViso").text('Campo ' + campo + ' deve ser preenchido!');
            $('#_modalAvisoCampo').modal('show');
        }

        function FechaAvisoVazio()
        {
            $('#_modalAvisoCampo').modal('hide');
        }

        function AvisoLogin()
        {
            var login = $('#_txtLogin').val();
            var senha = $('#_txtSenha').val();

            $('#_modalAvisoLogin').modal({
                keyboard: false,
                backdrop: 'static'
            })

            

            if (login == '')
            {
                $("#_lblAvisoLogin").text('Preencha o campo LOGIN');
                return false;
            }

            if (senha == '')
            {
                $("#_lblAvisoLogin").text('Preencha o campo SENHA');
                return false;
            }

            $('#_modalAvisoLogin').modal('show');
        }

        function FechaAvisoLogin()
        {
            $('#_modalAvisoLogin').modal('hide');
        }

        function BuscaDataCelula()
        {
            $('#_modalDataCelula').modal({
                keyboard: false,
                backdrop: 'static'
            })


            $('#_modalDataCelula').modal('show');
        }

        function EscolhaDataCelula()
        {
            $('#_modalDataCelula').modal('hide');
        }

        function BuscaDataMultiplicacao()
        {
            $('#_modalDataMultiplicacao').modal({
                keyboard: false,
                backdrop: 'static'
            })


            $('#_modalDataMultiplicacao').modal('show');
        }

        function EscolhaDataMultiplicacao()
        {
            $('#_modalDataMultiplicacao').modal('hide');
        }