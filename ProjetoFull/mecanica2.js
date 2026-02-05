let canvado = document.getElementById("jogo")
let c = canvado.getContext('2d')
const derrota = new Audio('audio/audio_hit.wav')
//let backgroundMusic = new Audio("audio/background.wav")
//const bossFight = new Audio('audio/boss.wav')
var audio =  new Audio('audio/audio_wing.wav')
const disparo = new Audio('audio/disparo.mp3')
let seconds = 0
let minutes = 0
document.body.style.backgroundColor = 'black'
canvado.style.backgroundImage = 'url(imagens/ghosthouse_night1.png)'
//canvado.style.backgroundColor = 'black'
canvado.style.backgroundRepeat = "no-repeat"


function endgame(){
    passaro.vida -= boo.agressividade
    document.querySelector('#info').innerHTML = Math.floor(passaro.vida)
    if(passaro.vida <=0){
        fimDeJogo()
    }
}

function dificuldade(){
    if(bulletBill.velocidade <=7){
        bulletBill.velocidade +=1
        bulletBill2.velocidade2 +=1
        boo.austeridade += 1
        boo.agressividade += 0.2
    }
    
}

function escreve(){
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

function fimDeJogo(){
    passaro.pulo = 0
    audio.pause()
    clearInterval(tempo)
    derrota.play()
    escreve()
}

function alterarFase(){
    c.clearRect(0,0,600,600)
    passaro.desenha()
    passaro.frames()
    window.location.href = "FASE3.html"

    fase3 = requestAnimationFrame(alterarFase)
}

function insanidade(){
    if(passaro.insanidade >=115){
        fimDeJogo()
    }
    passaro.insanidade += boo.austeridade
    document.querySelector('#insanidade').innerHTML = Math.floor(passaro.insanidade)
}

function alertaInsanidade(){
    const alertaInsanidade = new Audio('audio/coracao.mp3')
    alertaInsanidade.volume = 0.8
    passaro.insanidade<=50??alertaInsanidade.pause();alertaInsanidade.play() 
}

let tempo
function cronometro(){
    clearInterval(tempo)
    tempo = setInterval(()=>{
        seconds++
        normalInsanidade()
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
    else if(passaro.insanidade>=50){
        alertaInsanidade()
    }
    if(seconds%10==0)
    dificuldade()
    },1000)
}
cronometro()

let passaro = {
    altura: 35,
    largura: 35,
    vetorX: 1,
    vetorY: 50,
    x_mouse:100,
    insanidade: 1,
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
        //animacao()
    },
    pula: function(){
        passaro.vetorY += passaro.gravidade + passaro.velocidade
        passaro.velocidade = - passaro.pulo
    }
}

let boo = {
    altura: 175,
    largura: 175,
    vetorX: 559,
    vetorY: 310,
    velocidade:2,
    agressividade: 1,
    austeridade:1,
    fundo: 'imagens/boo.png',
    img: new Image(),
    desenha: function(){
        this.img.src = this.fundo
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },

    frames: function(){
        if(chefe.vetorY > 310 && chefe.vetorX < 3 || chefe.vetorY > 310 && chefe.vetorX > 500){
            this.vetorY = 310
        }
        if(chefe.vetorY < -5){
            this.vetorY = -5
        }
        if(chefe.vetorX+10 >= 550){
            this.condicao = -5
        }
        if(chefe.vetorX <= 3){
            this.condicao = 5
        }
    },

    mexe: function(){
        if(passaro.x_mouse < boo.vetorX){
            boo.vetorX -= this.agressividade
        }
        else if(passaro.x_mouse > boo.vetorX){
            boo.vetorX += this.agressividade
        }
        if(passaro.vetorY<boo.vetorY){
            boo.vetorY -= this.agressividade
        }
        else if(passaro.vetorY>boo.vetorY){
            boo.vetorY += this.agressividade
        }
    


    if(boo.vetorX - passaro.x_mouse <= 0){
        boo.fundo = 'imagens/boo2.png'
    }
    else if(boo.vetorX - passaro.x_mouse > 0){
        boo.fundo = 'imagens/boo.png'
    }
    }
}

let bulletBill = {
    altura: 125,
    largura: 125,
    X:1300,
    Y:400,
    velocidade:3,
    img: new Image(),
    printa: function(){
        this.img.src = "imagens/bulletBill.png"
        c.beginPath()
        c.drawImage(this.img, this.X, this.Y, this.altura, this.largura)
        c.closePath()
    },
    movimento: function(){
        bulletBill.X -= this.velocidade
        if(bulletBill.X <= -320 && bulletBill2.X <= -320){
        disparo.volume = 0.3
        disparo.play()
        variaDisparo()
    }
}
}

let bulletBill2 = {
    altura: 125,
    largura: 125,
    X:1300,
    Y:100,
    velocidade2: 3,
    img: new Image(),
    printa: function(){
        this.img.src = "imagens/bulletBill.png"
        c.beginPath()
        c.drawImage(this.img, this.X, this.Y, this.altura, this.largura)
        c.closePath()
    },
    movimento: function(){
        bulletBill2.X -= this.velocidade2
        if(bulletBill2.X <= -320 && bulletBill.X < bulletBill.X <= -320){
            disparo.volume = 0.3
            disparo.play()
            variaDisparo()
        }
        }
    }


//jogabilidade
document.addEventListener('click', ()=>{
    passaro.pula()
    audio.play()
})

document.addEventListener('mousemove',function(evento){
    let rect = canvado.getBoundingClientRect();
    passaro.x_mouse = evento.clientX - rect.left;

    if(passaro.x_mouse > 555){
        passaro.x_mouse = 555
    }
    if(passaro.x_mouse < 5){
        passaro.x_mouse = 5
    }
})

function sprites(){
    passaro.desenha()
    passaro.frames()
    bulletBill.printa()
    bulletBill2.printa()
    bulletBill.movimento()
    bulletBill2.movimento()
    boo.desenha()
    boo.mexe()
    animacao()
}

function loops(){
    c.clearRect(0,0,600,600)
    sprites()
    if(seconds>=35){
            alterarFase()
    }
    fase1  = requestAnimationFrame(loops)
}

loops()

function animacao(){
    if (passaro.vetorY > 800) {
        passaro.vetorY = 800
        endgame()
    }
    //Limite superior
    if (passaro.vetorY < -120) {
        passaro.vetorY = -120
        endgame()
    }
    if (
        passaro.x_mouse + passaro.largura > bulletBill.X &&   
        passaro.x_mouse < bulletBill.X + bulletBill.altura &&       
        passaro.vetorY + passaro.altura > bulletBill.Y && 
        passaro.vetorY < bulletBill.Y + bulletBill.largura  
    ) {
       endgame()
    }
    if (
        passaro.x_mouse + passaro.largura > bulletBill2.X &&   
        passaro.x_mouse < bulletBill2.X + bulletBill2.altura &&       
        passaro.vetorY + passaro.altura > bulletBill2.Y && 
        passaro.vetorY < bulletBill2.Y + bulletBill2.largura  
    ) {
        endgame()
    }
   if (passaro.x_mouse + passaro.largura > boo.vetorX && 
            passaro.x_mouse < boo.vetorX + boo.altura && 
            passaro.vetorY + passaro.altura > boo.vetorY && 
            passaro.vetorY < boo.vetorY + boo.largura  
        ) {
            insanidade()
        }
}

function variaDisparo(){
    bulletBill.X = Math.random()*1200 + 1000
    bulletBill2.X = Math.random()*600 + 1000
    varia  =  Math.random()*150 + 150
    bulletBill.Y = varia
    bulletBill2.Y = passaro.vetorY
}

function normalInsanidade(){
    const normalidade = 15
    if(passaro.insanidade >= normalidade){
        passaro.insanidade -= normalidade
    }
    document.querySelector('#insanidade').innerHTML = Math.floor(passaro.insanidade)
}

//indica se a vida do jogador está crítica
function alerta(){
    const alertaVida = new Audio('audio/closeDeath.mp3')
    alertaVida.volume = 0.3
    passaro.vida>50??alertaVida.pause();alertaVida.play()
}

//animação de bater asas passaro
setInterval(()=>{
    passaro.fundo = 'imagens/bluebird-downflap.png'
},1000)

setInterval(()=>{
    passaro.fundo = 'imagens/bluebird-midflap.png'
},1250)

setInterval(()=>{
    passaro.fundo = 'imagens/bluebird-upflap.png'
},1500)

document.addEventListener("DOMContentLoaded", function(){
	document.addEventListener("visibilitychange", function() {
	  if(document.visibilityState == 'hidden'){
	  	window.location.href = 'menu.html'
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

audio.volume = 0.3
disparo.volume = 0.3
derrota.volume = 0.3