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

			$.ajax({
			    type: "POST",
			    url: "http://service.portalgecel.com.br/Services/UsuarioService.asmx/BuscaLoginUsuario",
			    data: "login=" + login + "&senha=" + senha,
			    dataType: "xml",
			    success: function (data) {

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

			            $('#_txtIdUsuario').text(id_pessoa);

			            MostraCelulaUsuario();
			        }
			    },
			    complete: function (data) {


			    },
			    error: function (data) {

			        alert("error");
			    }
			});

        }


        function MostraCelulaUsuario() {

            var idusuario = $('#_txtIdUsuario').text();

            $.ajax({
                type: "POST",
                url: "http://service.portalgecel.com.br/Services/RelatorioSemanaService.asmx/BuscaCelulaDoUsuario",
                data: "idUsuario=" + idusuario,
                dataType: "xml",
                success: function (data) {

                    var html = "";

                    $(data).find('Table1').each(function () {

                        var id_celula = $(this).find('id_celula').text();
                        var nomeCelula = $(this).find('nome').text();

                        html = html + '' +
                            '<div class="row-fluid">' +
                            '   <div class="span12">' +
                            '       <div class="control-group">' +
                            '          <div class="controls">' +
                            '              <button class="btn btn-large btn-block _btnEscolhaCelula" value="' + id_celula + '"><strong>' + nomeCelula + '</strong></button>' +
                            '           </div>' +
                            '       </div>' +
                            '  </div>' +
                            '</div>' +
                            '<br/>';
                    });

                    $("input").val('');

                    document.getElementById('_divEscolhaCelula').innerHTML = html;


                    $('#_modalCelulas').modal({
                        keyboard: false,
                        backdrop: 'static'
                    })

                    $('#_modalCelulas').modal('show');

                    EscolheCelula();
                },
                complete: function (data) {



                },
                error: function (data) {

                    alert("error");
                }
            });

        }

        function EscolheCelula() {

            $("._btnEscolhaCelula").click(function () {

                $('#_modalCelulas').modal('hide');

                var id_celula = $(this).val();

                $('#_txtIdCelula').text(id_celula);

            });

        }


        function EnviarRelatorio() {

            var idCelula = $('#_txtIdCelula').text();
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
            var observacao = $('#_txtObservacao').val();

            if (VerificaVazios())
            {
                var elem = dtCelula.split('/');
                var dia = elem[0];
                var mes = elem[1];
                var ano = elem[2];
                var novaDataCelula = mes + "/" + dia + "/" + ano;

                var novaDataMultiplicacao = '';
                if (dtMult != '') {
                    var elem2 = dtMult.split('/');
                    var dia2 = elem2[0];
                    var mes2 = elem2[1];
                    var ano2 = elem2[2];
                    novaDataMultiplicacao = mes2 + "/" + dia2 + "/" + ano2;
                }

                $.ajax({
                    type: "POST",
                    url: "http://service.portalgecel.com.br/Services/RelatorioSemanaService.asmx/EnviaRelatorio",
                    data: "idCelula=" + idCelula + "&membro=" + membro + "&visita=" + visita + "&crianca=" + crianca +
                        "&total=" + total + "&mda=" + mda + "&ge=" + ge + "&batismo=" + batismo +
                        "&kgAmor=" + kgAmor + "&dataCelula=" + novaDataCelula + "&dataMultiplicacao=" + novaDataMultiplicacao + "&observacao=" + observacao,
                    dataType: "xml",
                    success: function (data) {

                        var retorno = $(data).find('int').text();
                        if (retorno < 1) {

                            alert('Não foi possível incluir o registro');
                        }

                        $("input").val('');

                        $('#_modalSucessoCadastro').modal({
                            keyboard: false,
                            backdrop: 'static'
                        })

                        $('#_modalSucessoCadastro').modal('show');
                    },
                    complete: function (data) {



                    },
                    error: function (data) {

                        alert('Erro! Tente novamente.');

                    }
                });

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

