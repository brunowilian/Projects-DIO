function start() { // Inicio da fun��o start()



	$("#inicio").hide();
	
	$("#fundoGame").append("<div  class='anima1' id='jogador'></div>");
	$("#fundoGame").append("<div class='anima2' id='inimigo1'></div>");
	$("#fundoGame").append("<div  id='inimigo2'></div>");
	$("#fundoGame").append("<div  class='anima3'id='amigo'></div>");

    //Principais vari�veis do jogo
    
	
	var jogo = {};


    var podeAtirar=true;
    var velocidade=8;
    var posicaoY = parseInt(Math.random() * 334);
    var TECLA = {
        W: 87,
        S: 83,
        D: 32,
        }
        
        jogo.pressionou = [];

        //Verifica se o usu�rio pressionou alguma tecla	
	
	$(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
        });
    
    
        $(document).keyup(function(e){
           jogo.pressionou[e.which] = false;
        });
	
	//Game Loop

	jogo.timer = setInterval(loop,30);
	
	function loop() {
	movejogador();
	movefundo();
	moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();
   
	} // Fim da fun��o loop()



//Fun��o que movimenta o fundo do jogo
	
	function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-1);
	
	} // fim da fun��o movefundo()

    function movejogador() {
	
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo-10);

            if (topo<=0) {
		
                $("#jogador").css("top",topo+5);
            }
            
        
        }
        
        if (jogo.pressionou[TECLA.S]) {
            
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);	

            if (topo>=434) {	
                $("#jogador").css("top",topo-10);
                    
            }
        }
        
        if (jogo.pressionou[TECLA.D]) {
            disparo();
            //Chama fun��o Disparo	
        }
    
        } // fim da fun��o movejogador()

        function moveinimigo1() {

            posicaoX = parseInt($("#inimigo1").css("left"));
            $("#inimigo1").css("left",posicaoX-velocidade);
            $("#inimigo1").css("top",posicaoY);
                
                if (posicaoX<=0) {
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);
                    
                }
        } //Fim da fun��o moveinimigo1()

        function moveinimigo2() {
            posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left",posicaoX-3);
                    
            if (posicaoX<=0) {
                
            $("#inimigo2").css("left",775);
                        
            }
    } // Fim da fun��o moveinimigo2()

    function moveamigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);
                    
            if (posicaoX>906) {
                
            $("#amigo").css("left",0);
                        
            }
    
    } // fim da fun��o moveamigo()

    function disparo() {
	
        if (podeAtirar==true) {
            
        podeAtirar=false;
        
        topo = parseInt($("#jogador").css("top"))
        posicaoX= parseInt($("#jogador").css("left"))
        tiroX = posicaoX + 190;
        topoTiro=topo+37;
        $("#fundoGame").append("<div id='disparo'></div");
        $("#disparo").css("top",topoTiro);
        $("#disparo").css("left",tiroX);
        
        var tempoDisparo=window.setInterval(executaDisparo, 30);
        
        } //Fecha podeAtirar
     
               function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); 
    
                    if (posicaoX>900) {
                            
                window.clearInterval(tempoDisparo);
                tempoDisparo=null;
                $("#disparo").remove();
                podeAtirar=true;
                        
                       }
        } // Fecha executaDisparo()
    } // Fecha disparo()

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        // jogador com o inimigo1
            
            if (colisao1.length>0) {
                
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y);
        
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
            }

            
        
        } //Fim da fun��o colisao()

        function explosao1(inimigo1X,inimigo1Y) {
            $("#fundoGame").append("<div id='explosao1'></div");
            $("#explosao1").css("background-image", "url(imgs/explosao.png)");
            var div=$("#explosao1");
            div.css("top", inimigo1Y);
            div.css("left", inimigo1X);
            div.animate({width:200, opacity:0}, "slow");
            
            var tempoExplosao=window.setInterval(removeExplosao, 1000);
            
                function removeExplosao() {
                    
                    div.remove();
                    window.clearInterval(tempoExplosao);
                    tempoExplosao=null;
                    
                }
                
            } // Fim da fun��o explosao1()

} // Fim da fun��o start


