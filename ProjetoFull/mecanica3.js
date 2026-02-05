let canvado = document.getElementById("jogo")
let c = canvado.getContext('2d')
let seconds = 0
let minutes = 0
const derrota = new Audio('audio/audio_hit.wav')
derrota.volume = 0.3
const bossFight = new Audio('audio/boss.wav')
bossFight.volume = 0.2
let fase1, fase2, fase3
const sonicJ = new Audio('audio/sonicpulo.wav')
sonicJ.volume = 0.2
let sonic, limitador = 0
var audio =  new Audio('audio/audio_wing.wav')
let recebaPoder = new Audio('audio/powerup.wav')
canvado.style.backgroundColor = 'black'
document.body.style.backgroundImage = 'url(imagens/castle2.jpg)'


//escreve fim de jogo
function escreve(){
    //clearInterval(dificuldade)
    c.clearRect(0,0,600,600)
    canvado.style.backgroundImage = 'none'
    canvado.style.backgroundColor = 'black'
    c.beginPath()
    c.lineWidth = 2;
    c.fillStyle = 'white';
    c.strokeStyle = 'white';
    c.font = "45px Arial"
    c.textAlign = "center";
    c.fillText("Game Over",300,300);
    c.strokeText("Game Over",300,300)
    c.closePath()
    return False
}

//insere um cenário e inicia a música com interação jogador

const musica = setTimeout(()=>{
                    bossFight.play()
                },2000)

//contador de tempo
let tempo
function cronometro(){
    clearInterval(tempo)
    tempo = setInterval(()=>{
        seconds++
        endgame()
        let displayTempo
        displayTempo = seconds < 10?`0${seconds}`: seconds
        document.querySelector("#seconds").innerHTML = displayTempo
        if(seconds==60){
            seconds = 0
            minutes++
            minutes >= 10?minutes: minutes = `0${minutes}`
            document.querySelector("#minutes").innerHTML = minutes
        }
    if(passaro.vida <= 50){
        alerta()
    }
    if(seconds%10==0){
        diminuirCenario()
    }
    },1000)
}
cronometro()

function diminuirCenario(){
    if(limitador <=200){
        red_cano.vetorX += 50
        red_cano2.vetorX -= 50
        limitador += 50 
        chefe.agressividade += 5
    }
}

//finaliza o jogo
function endgame(){
    passaro.vida -= chefe.agressividade
    document.querySelector('#info').innerHTML = passaro.vida
    if(passaro.vida <=0){
        passaro.pulo = 0
        cancelAnimationFrame(fase1)
        clearInterval(tempo)
        bossFight.pause()
        derrota.play()
        escreve()
    }
}

//indica se a vida do jogador está crítica
function alerta(){
    const alertaVida = new Audio('audio/closeDeath.mp3')
    alertaVida.volume = 0.3
    passaro.vida>50??alertaVida.pause();alertaVida.play()
}

function perdeForca(){
    if(chefe.vetorX > passaro.x_mouse && chefe.vetorX < 400){
        chefe.vetorX += 2
    }
    if(chefe.vetorX < passaro.x_mouse  && chefe.vetorX > 250){
        chefe.vetorX -= 2 
    }
    if(chefe.vetorY > passaro.vetorY  && chefe.vetorY < 580){
        chefe.vetorY +=2
    }
    if(chefe.vetorY < passaro.vetorY && chefe.vetorY >= 10){
        chefe.vetorY -= 2
    }
}

//animação de bater asas passaro
setInterval(()=>{
    passaro.fundo = 'imagens/bluebird-downflap.png'
    chefe.fundo = 'imagens/redbird-midflap.png'
},1000)

setInterval(()=>{
    passaro.fundo = 'imagens/bluebird-midflap.png'
    chefe.fundo = 'imagens/redbird-upflap.png'
},1250)

setInterval(()=>{
    passaro.fundo = 'imagens/bluebird-upflap.png'
    chefe.fundo = 'imagens/redbird-downflap.png'
},1500)


//todos objetos na tela
let passaro = {
    altura: 35,
    largura: 35,
    vetorX: 450,
    vetorY: 50,
    x_mouse:100,
    vida:parseInt(document.querySelector('#info').innerHTML),
    fundo:'imagens/bluebird-midflap.png',
    img: new Image(),
    desenha: function(){
        this.img.src = this.fundo
        c.beginPath()
        c.drawImage(this.img, this.x_mouse, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
    gravidade: 0.05,
    velocidade:0,
    pulo: 3,
    frames: function(){
        passaro.velocidade += passaro.gravidade
        passaro.vetorY += passaro.velocidade
        animacao()
    },
    pula: function(){
        passaro.vetorY += passaro.gravidade + passaro.velocidade
        passaro.velocidade = - passaro.pulo
    }
}

let chefe = {
    altura: 35,
    largura: 35,
    vetorX: 100,
    vetorY: 550,
    agressividade: 1,
    vida:parseInt(document.querySelector('#info2').innerHTML),
    fundo:'imagens/redbird-midflap.png',
    img: new Image(),
    desenha: function(){
        this.img.src = this.fundo
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
    gravidade: 0.05,
    velocidade:0,
    pulo: 3,
    frames: function(){
        //this.velocidade >=2.85
        if(this.vetorY >= 560 || this.vetorY >= passaro.vetorY + 150 || this.velocidade >=4.3){
            this.pula()
        }else if(this.vetorY <= -5 ){
            this.velocidade += this.gravidade
            this.vetorY += this.velocidade
            chefe.vetorX -= 2
        }

        if(this.vetorX == passaro.x_mouse){
            this.vetorX -= (Math.random()*(-1))*50
        }

        if(this.vetorX < 65 + limitador){
            this.vetorX = 65 + limitador
        }
        if(this.vetorX > 500 - limitador){
            this.vetorX = 500  -limitador
        }
        this.velocidade += this.gravidade
        this.vetorY += this.velocidade
        animacao()
        perdeForca()
    },
    pula: function(){
        this.vetorY += this.gravidade + this.velocidade
        this.velocidade = - this.pulo
    }
}

let caixa = {
    altura: 35,
    largura: 35,
    vetorX: 610,
    vetorY: 150,
    velocidade:2,
    fundoCaixa: 'imagens/box.png',
    img: new Image(),
    desenha: function(){
        this.img.src = this.fundoCaixa
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
    mexe: function(){
    caixa.vetorX -= this.velocidade
    if(caixa.vetorX < -60){
        caixa.vetorX =  5600
        caixa.vetorY =  150
        caixa.fundoCaixa = 'imagens/box.png'
    }
    }
}

//objetos de chefe
let red_cano = {
    altura: 50,
    largura: 600,
    vetorX:10,
    vetorY:10,
    img: new Image(),
    printa: function(){
        this.img.src = "imagens/verm_cano.png"
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
}

let red_cano2 = {
    altura: 50,
    largura: 600,
    vetorX:535,
    vetorY:10,
    img: new Image(),
    printa: function(){
        this.img.src = "imagens/verm_cano.png"
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
}

//jogabilidade
document.addEventListener('click', ()=>{
    passaro.pula()
    audio.play()
})

loops()

function captarVolume(){
    const parametroModo = new URLSearchParams(window.location.search)
    const volumedados = parametroModo.get("dados")
    volumeEfeitos(volumedados)
}

function volumeEfeitos(volumeModos){
    volumeModos = 0.2
    audio.volume = volumeModos 
    recebaPoder.volume = volumeModos
    sonicJ.volume = volumeModos
    derrota.volume = volumeModos 
    bossFight.volume = volumeModos
}

captarVolume()

//jpgabilidade horizontal
document.addEventListener('mousemove',function(evento){
    let rect = canvado.getBoundingClientRect();
    passaro.x_mouse = evento.clientX - rect.left;

    if(passaro.x_mouse > 500 - limitador){
        passaro.x_mouse = 500 - limitador
    }
    if(passaro.x_mouse < 65 + limitador){
        passaro.x_mouse = 65 + limitador
    }
})

function sprites(){
    passaro.desenha()
    passaro.frames()
    chefe.desenha()
    chefe.frames()
    caixa.desenha()
    caixa.mexe()
    red_cano.printa()
    red_cano2.printa()
}

function loops(){
    c.clearRect(0,0,600,600)
    sprites()
    if(chefe.vida<=0){
        fimDeJogo()
    }
    fase1  = requestAnimationFrame(loops)
}

//escreve fim de jogo
function escreveFinal(){
    //clearInterval(dificuldade)
    c.clearRect(0,0,600,600)
    canvado.style.backgroundImage = 'none'
    canvado.style.backgroundColor = 'black'
    c.beginPath()
    c.lineWidth = 2;
    c.fillStyle = 'white';
    c.strokeStyle = 'white';
    c.font = "45px Arial"
    c.textAlign = "center";
    c.fillText("Fim de Jogo",300,300);
    c.strokeText("Fim de Jogo",300,300)
    c.closePath()
    return False
}

function fimDeJogo(){
    chefe.pulo = 0
    clearInterval(tempo)
    derrota.play()
    escreveFinal()
}
//verifica condicoes de derrota jogador
function animacao() {
    //Limite inferior
    if (passaro.vetorY > 800) {
        passaro.vetorY = 800;
        endgame();
    }
    //Limite superior
    if (passaro.vetorY < -60) {
        passaro.vetorY = -60;
    }
    //colisão com a caixa
   if (passaro.x_mouse + passaro.largura > caixa.vetorX && passaro.x_mouse < caixa.vetorX + caixa.altura && passaro.vetorY + passaro.altura > caixa.vetorY && passaro.vetorY < caixa.vetorY + caixa.largura  
    ) {
        let limiteX = Math.min(passaro.vetorX + passaro.largura - caixa.vetorX, caixa.vetorX + caixa.largura - passaro.vetorX) 
        let limiteY = Math.min(passaro.vetorY + passaro.altura - caixa.vetorY, caixa.vetorY + caixa.altura - passaro.vetorY) 
        

            if (limiteX > limiteY) { 
                if (passaro.vetorX < caixa.vetorX ){ 
                    passaro.vetorX -= limiteX
                }   
                else{ 
                passaro.vetorX += limiteX
                } 
            } 
            else{ 
                if (passaro.vetorY < caixa.vetorY){ 
                        passaro.vetorY -= limiteY
                        passaro.pula()
                } 
                else {
                    passaro.vetorY += limiteY
             } 
            }
        poderes()
        caixa.fundoCaixa = 'imagens/block.png'

    }
    if (passaro.x_mouse + passaro.largura > chefe.vetorX && passaro.x_mouse < chefe.vetorX + chefe.altura && passaro.vetorY + passaro.altura > chefe.vetorY && passaro.vetorY < chefe.vetorY + chefe.largura  
    ) {
        let limiteX = Math.min(passaro.vetorX + passaro.largura - chefe.vetorX, chefe.vetorX + chefe.largura - passaro.vetorX) 
        let limiteY = Math.min(passaro.vetorY + passaro.altura - chefe.vetorY, chefe.vetorY + chefe.altura - passaro.vetorY) 
        

            if (limiteX > limiteY) { 
                if (passaro.vetorX < chefe.vetorX ){ 
                    passaro.vetorX -= limiteX
                    chefe.vida -=10
                    document.getElementById("info2").innerHTML = chefe.vida
                }   
                else{ 
                    passaro.vetorX += limiteX
                    chefe.vida -=10
                    document.getElementById("info2").innerHTML = chefe.vida
                } 
            } 
            else{ 
                if (passaro.vetorY < chefe.vetorY){ 
                        passaro.vetorY -= limiteY
                        passaro.pula()
                        chefe.vida -=10
                        document.getElementById("info2").innerHTML = chefe.vida
                } 
                else {
                    passaro.vetorY += limiteY
                    chefe.vida -=10
                    document.getElementById("info2").innerHTML = chefe.vida
                    if(chefe.vetorX>50+limitador){
                        chefe.vetorX -= 1
                    }else{
                        chefe.vetorX+=1
                    }
             } 
            }

    }

}
//poderes de vida
function poderes(){
    if(caixa.fundoCaixa != 'imagens/block.png'){
        if(caixa.fundoCaixa != 'imagens/block.png'){
        chefe.vida -= 2000
        document.getElementById("info2").innerHTML = chefe.vida
        recebaPoder.play()
    } 
    }  
}

document.addEventListener("DOMContentLoaded", function(){
	document.addEventListener("visibilitychange", function() {
	  if( document.visibilityState == 'hidden'){
	  	history.back()
	  }
	});
});

//perdeu né, reinicia ai
document.querySelector("#reiniciar").addEventListener('click', ()=>{window.location.reload()})

document.addEventListener("keydown", function(evento){
    if(evento.key == "Enter"){

        window.location.reload()
    }
})

