let canvado = document.getElementById("jogo")
var audio =  new Audio('../audio/audio_wing.wav')
var audio2 =  new Audio('../audio/audio_wing.wav')
let c = canvado.getContext('2d')
const derrota = new Audio('../audio/audio_hit.wav')
const sonicJ = new Audio('../audio/sonicpulo.wav')
document.body.style.backgroundColor = 'grey'
canvado.style.backgroundImage = 'url(../imagens/scrapbrainzone.jpg)'
canvado.style.backgroundRepeat = "no-repeat"
let seconds = 0
let minutes = 0
let animation
let sonic

let passaro = {
    altura: 35,
    largura: 35,
    vetorX: 250,
    vetorY: 80,
    vida:parseInt(document.querySelector('#info').innerHTML),
    fundo:'../imagens/bluebird-midflap.png',
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
        passaro.velocidade += passaro.gravidade
        passaro.vetorY += passaro.velocidade
        animacao()
    },
    pula: function(){
        passaro.vetorY += passaro.gravidade + passaro.velocidade
        passaro.velocidade = - passaro.pulo
    }
}

let passaro2 = {
    altura: 35,
    largura: 35,
    vetorX: 250,
    vetorY: 50,
    vida:parseInt(document.querySelector('#info').innerHTML),
    fundo:'../imagens/redbird-midflap.png',
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
        passaro2.velocidade += passaro2.gravidade
        passaro2.vetorY += passaro2.velocidade
        animacao()
    },
    pula: function(){
        passaro2.vetorY += passaro2.gravidade + passaro2.velocidade
        passaro2.velocidade = - passaro2.pulo
    }
}

let cano = {
    altura: 50,
    largura: 550,
    X:800,
    Y:400,
    velocidade:3,
    img: new Image(),
    printa: function(){
        this.img.src = "../imagens/cano.png"
        c.beginPath()
        c.drawImage(this.img, this.X, this.Y, this.altura, this.largura)
        c.closePath()
    },
    movimento: function(){
        cano.X -= this.velocidade
        if(cano.X <= -60){
        cano.X = 660
        variaposicao()
    }
}
}

let cano2 = {
    altura: 50,
    largura: 550,
    X:800,
    Y:-350,
    velocidade2: 3,
    img: new Image(),
    printa: function(){
        this.img.src = "../imagens/cano2.png"
        c.beginPath()
        c.drawImage(this.img, this.X, this.Y, this.altura, this.largura)
        c.closePath()
    },
    movimento: function(){
        cano2.X -= this.velocidade2
        if(cano2.X <= -60){
        cano2.X = 660
        variaposicao()
        }
        }
    }

let caixa = {
    altura: 35,
    largura: 35,
    vetorX: 610,
    vetorY: 150,
    velocidade:0,
    fundoCaixa: '../imagens/box.png',
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
        caixa.vetorY = cano.Y - 150
        caixa.fundoCaixa = '../imagens/box.png'
    }
    }
}

let chefe = {
    altura: 57,
    largura: 81,
    vetorX: 0,
    vetorY: -150,
    gravidade: 0.05,
    velocidade:0,
    pulo: 6,
    condicao:5,
    fundo: '../imagens/sonic_middle.png',
    img: new Image(),
    desenha: function(){
        this.img.src = this.fundo
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
    frames: function(){
        this.velocidade += chefe.gravidade
        this.vetorY += chefe.velocidade
        if(chefe.vetorY > 310 && chefe.vetorX < 3 || chefe.vetorY > 310 && chefe.vetorX > 500){
            chefe.vetorY = 310
        }
        if(chefe.vetorY < -5){
            chefe.vetorY = -5
        }
        if(chefe.vetorX+10 >= 550){
            this.condicao = -5
            cancelAnimationFrame(sonic)
            chefe.fundo = '../imagens/sonic_middle2.png'
        }
        if(chefe.vetorX <= 3){
            this.condicao = 5
            cancelAnimationFrame(sonic)
            chefe.fundo = '../imagens/sonic_middle.png'
        }
    },
    
    pula: function(){
        mudaPulo = {
            pulo1 : setInterval(()=>{
                if(chefe.vetorY < 310  ){
                    chefe.fundo = '../imagens/jump2.png'
                    clearInterval(this.pulo1)
                }},50),
        
            pulo2 : setInterval(()=>{
                    if(chefe.vetorY < 310  ){
                        chefe.fundo = '../imagens/jump3.png'
                        clearInterval(this.pulo2)
                    }},250),
        
            pulo3 : setInterval(()=>{
                if(chefe.vetorY < 310  ){
                    chefe.fundo = '../imagens/jump1.png'
                    clearInterval(this.pulo3)
                }},500)
        }

        this.img.src = this.fundo
        this.vetorY += chefe.gravidade + chefe.velocidade
        this.velocidade = - chefe.pulo
    }
}

let red_cano = {
    altura: 50,
    largura: 550,
    vetorX:10,
    vetorY:390,
    img: new Image(),
    printa: function(){
        this.img.src = "../imagens/verm_cano.png"
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
}

let red_cano2 = {
    altura: 50,
    largura: 550,
    vetorX:540,
    vetorY:390,
    img: new Image(),
    printa: function(){
        this.img.src = "../imagens/verm_cano.png"
        c.beginPath()
        c.drawImage(this.img, this.vetorX, this.vetorY, this.altura, this.largura)
        c.closePath()
    },
}

document.addEventListener('click', ()=>{
    passaro.pula()
    audio.play()
})

const  dificuldade =  setInterval(()=>{
    if(passaro.x_mouse != undefined){
        //if( cano.velocidade < 5){
            //cano.velocidade += 0.7
            //cano2.velocidade2 += 0.7
            //passaro.gravidade += 0.05
            //passaro.pulo += 1
            //caixa.velocidade += 0.7
        //}
    }

sonicPular()
},12000)

//contador de tempo
let tempo
function cronometro(){
    clearInterval(tempo)
    tempo = setInterval(()=>{
        seconds++
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
    },1000)
}
cronometro()

//escreve fim de jogo
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

function endgame(){
passaro.vida -= 1
document.querySelector('#info').innerHTML = passaro.vida
if(passaro.vida <=0){
    clearInterval(tempo)
    derrota.play()
    escreve()
    return False
}
}

setInterval(()=>{
passaro.fundo = '../imagens/bluebird-downflap.png'
passaro2.fundo = '../imagens/redbird-downflap.png'
},1000)

setInterval(()=>{
passaro.fundo = '../imagens/bluebird-midflap.png'
passaro2.fundo = '../imagens/redbird-midflap.png'
},1250)

setInterval(()=>{
passaro.fundo = '../imagens/bluebird-upflap.png'
passaro2.fundo = '../imagens/redbird-upflap.png'
},1500)

loops()


function loops(){
    c.clearRect(0,0,600,600)
    passaro.desenha()
    passaro2.desenha()
    passaro2.frames()
    passaro.frames()
    cano.printa()
    cano2.printa()
    cano.movimento()
    cano2.movimento()
    caixa.desenha()
    caixa.mexe()
    animation  = requestAnimationFrame(loops)
}

setTimeout(function chefao(){
    cancelAnimationFrame(animation)
    //clearInterval(dificuldade)
    c.clearRect(0,0,600,600)
    canvado.style.backgroundImage = 'none'
    cano.printa()
    cano2.printa()
    cano.movimento()
    cano2.movimento()
    passaro.desenha()
    passaro.frames()
    passaro2.desenha()
    passaro2.frames()
    red_cano.printa()
    red_cano2.printa()
    chefe.desenha() 
    chefe.frames()
    animation = requestAnimationFrame(chefao)
    document.body.style.backgroundColor = 'black'
    canvado.style.backgroundColor = 'blue'
    //backgroundMusic.pause()
    //bossFight.play()
},10000)

//parte do Henriqueee
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
    //colisão com o cano(lá ele)
    if (
        passaro.vetorX + passaro.largura > cano.X &&   
        passaro.vetorX < cano.X + cano.altura &&       
        passaro.vetorY + passaro.altura > cano.Y && 
        passaro.vetorY < cano.Y + cano.largura  
    ) {
        endgame();
    }
    if (
        passaro.vetorX + passaro.largura > cano2.X &&   
        passaro.vetorX < cano2.X + cano2.altura &&       
        passaro.vetorY + passaro.altura > cano2.Y && 
        passaro.vetorY < cano2.Y + cano2.largura  
    ) {
        endgame();
    }

    //passaro2 colisão com cano
    if (passaro2.vetorY > 800) {
        passaro2.vetorY = 800;
        endgame();
    }
    //Limite superior
    if (passaro2.vetorY < -60) {
        passaro2.vetorY = -60;
    }
    //colisão com o cano(lá ele)
    if (
        passaro2.vetorX + passaro2.largura > cano.X &&   
        passaro2.vetorX < cano.X + cano.altura &&       
        passaro2.vetorY + passaro2.altura > cano.Y && 
        passaro2.vetorY < cano.Y + cano.largura  
    ) {
        endgame();
    }
    if (
        passaro2.vetorX + passaro2.largura > cano2.X &&   
        passaro2.vetorX < cano2.X + cano2.altura &&       
        passaro2.vetorY + passaro2.altura > cano2.Y && 
        passaro2.vetorY < cano2.Y + cano2.largura  
    ) {
        endgame();
    }
    //colisão com a caixa
   if (passaro.vetorX + passaro.largura > caixa.vetorX && passaro.vetorX < caixa.vetorX + caixa.altura && passaro.vetorY + passaro.altura > caixa.vetorY && passaro.vetorY < caixa.vetorY + caixa.largura  
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
        caixa.fundoCaixa = '../imagens/block.png'

    }
    //colisão com chefe passaro e passaro2
    if (passaro.vetorX + passaro.largura > chefe.vetorX && 
            passaro.vetorX < chefe.vetorX + chefe.altura && 
            passaro.vetorY + passaro.altura > chefe.vetorY && 
            passaro.vetorY < chefe.vetorY + chefe.largura  
        ) {
            endgame();
        }

    if (passaro2.vetorX + passaro2.largura > chefe.vetorX && 
            passaro2.vetorX < chefe.vetorX + chefe.altura && 
            passaro2.vetorY + passaro2.altura > chefe.vetorY && 
            passaro2.vetorY < chefe.vetorY + chefe.largura  
        ) {
            endgame();
        }
}

function poderes(){
    if(caixa.fundoCaixa != '../imagens/tijolo.png'){
        let podale = Math.floor(Math.random()*10) + 1
        switch (podale){
            case 1:
                passaro.vida>=100?passaro.vida:passaro.vida += 3
                document.querySelector('#info').innerHTML = passaro.vida
            case 2:
                cano.velocidade = 0.01
                cano2.velocidade2 = 0.01
                passaro.gravidade = 0.05
                passaro.pulo = 3
                caixa.velocidade = 0
            default:
                console.log('azar') 
        }
    }  
}

function variaposicao(){
    varia  =  Math.random()*500 + 150
    varia_2 = -800 + varia
    cano.Y = varia
    cano2.Y = varia_2
}

function mudaCenario(){
    let mudafundo = Math.floor(Math.random()*4)
    switch (mudafundo){
        case 1:
            document.body.style.backgroundColor = 'lightblue'
            canvado.style.backgroundImage = 'url(../imagens/fundo.jpg)'
            canvado.style.backgroundRepeat = "no-repeat"
            break
        case 2:
            document.body.style.backgroundColor = 'black'
            canvado.style.backgroundImage = 'url(../imagens/urbancity.jpg)'
            canvado.style.backgroundRepeat = "no-repeat"
            break
        case 3:
            document.body.style.backgroundColor = 'lightgreen'
            canvado.style.backgroundImage = 'url(../imagens/forest.jpg)'
            canvado.style.backgroundRepeat = "no-repeat"
            break
    }
}

function sonicPular(){
    sonicJ.play()
    chefe.vetorX += chefe.condicao
    chefe.pulo = 1
    sonic = requestAnimationFrame(sonicPular)
    chefe.pula()
}

document.addEventListener("keydown", function(event){
    if(event.code == 'Space')
    passaro2.pula()
    audio2.play()
})

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

function captarVolume(){
    const parametroModo = new URLSearchParams(window.location.search)
    const volumedados = parametroModo.get("dados")
    volumeEfeitos(volumedados)
}

function volumeEfeitos(volumeModos){
    audio.volume = volumeModos 
    audio2.volume = volumeModos
    sonicJ.volume = volumeModos
    derrota.volume = volumeModos 
}

captarVolume()