let canvado = document.getElementById("jogo")
let c = canvado.getContext('2d')
let seconds = 0
let minutes = 0
const derrota = new Audio('audio/audio_hit.wav')
derrota.volume = 0.3
let backgroundMusic = new Audio("audio/background.wav")
backgroundMusic.volume = 0.3
let fase1, fase2
const bossFight = new Audio('audio/boss.wav')
bossFight.volume = 0.2
const sonicJ = new Audio('audio/sonicpulo.wav')
sonicJ.volume = 0.2
let sonic
let estadoJogo = false
var audio =  new Audio('audio/audio_wing.wav')
let recebaPoder = new Audio('audio/powerup.wav')

//escreve fim de jogo
function escreve(){
    //clearInterval(dificuldade)
    clearTimeout(mudanca)
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
mudaCenario()
const musica = setTimeout(()=>{
                    backgroundMusic.play()
                },2000)

//contador de tempo
let tempo
function cronometro(){
    tempo = setInterval(()=>{
        seconds++
        seconds >= 10?seconds: seconds = `0${seconds}`
        document.querySelector("#seconds").innerHTML = seconds
        if(seconds==60){
            seconds = 0
            minutes++
            minutes >= 10?minutes: minutes = `0${minutes}`
            document.querySelector("#minutes").innerHTML = minutes
        }
    },1000)
}
cronometro()


//finaliza o jogo
function endgame(){
    passaro.vida -= chefe.agressividade
    document.querySelector('#info').innerHTML = passaro.vida
    if(passaro.vida <=0){
        passaro.pulo = 0
        cancelAnimationFrame(sonic)
        cancelAnimationFrame(fase1)
        clearTimeout(mudanca)
        clearInterval(Luta)
        clearInterval(tempo)
        backgroundMusic.pause()
        bossFight.pause()
        sonicJ.pause()
        derrota.play()
        escreve()
    }
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


//todos objetos na tela
let passaro = {
    altura: 35,
    largura: 35,
    vetorX: 1,
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

let cano = {
    altura: 50,
    largura: 550,
    X:800,
    Y:400,
    velocidade:3,
    img: new Image(),
    printa: function(){
        this.img.src = "imagens/cano.png"
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
        this.img.src = "imagens/cano2.png"
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
        caixa.vetorY = cano.Y - 150
        caixa.fundoCaixa = 'imagens/box.png'
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
    pulo: 1,
    condicao:5,
    agressividade:2,
    fundo: 'imagens/sonic_middle.png',
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
            chefe.fundo = 'imagens/sonic_middle2.png'
        }
        if(chefe.vetorX <= 3){
            this.condicao = 5
            cancelAnimationFrame(sonic)
            chefe.fundo = 'imagens/sonic_middle.png'
        }
    },
    
    pula: function(){
        mudaPulo = {
            pulo1 : setInterval(()=>{
                if(chefe.vetorY < 310  ){
                    chefe.fundo = 'imagens/jump2.png'
                    clearInterval(this.pulo1)
                }},50),
        
            pulo2 : setInterval(()=>{
                    if(chefe.vetorY < 310  ){
                        chefe.fundo = 'imagens/jump3.png'
                        clearInterval(this.pulo2)
                    }},55),
        
            pulo3 : setInterval(()=>{
                if(chefe.vetorY < 310  ){
                    chefe.fundo = 'imagens/jump1.png'
                    clearInterval(this.pulo3)
                }},60)
        }

        this.img.src = this.fundo
        this.vetorY += chefe.gravidade + chefe.velocidade
        this.velocidade = - chefe.pulo
    }
}

//grau de dificuldade
/*let dificuldade
function alteracaoDificuldade(){
    dificuldade =  setInterval(()=>{
    if(passaro.x_mouse != undefined && seconds>20){
        cano.velocidade += 0.005
        cano2.velocidade2 += 0.005
        passaro.gravidade += 0.005
        passaro.pulo += 0.005
        chefe.pulo += 0.005
        chefe.agressividade += 1
    }
    mudaCenario()
},3000)
}
alteracaoDificuldade()*/

//objetos de chefe
let red_cano = {
    altura: 50,
    largura: 550,
    vetorX:10,
    vetorY:390,
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
    largura: 550,
    vetorX:535,
    vetorY:390,
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
    audio.volume = 0.3
    audio.play()
})

loops()

function captarVolume(){
    const parametro = new URLSearchParams(window.location.search)
    const volumedados = parametro.get("dados")
    //console.log(volumedados)
    volumeJogo(volumedados)
}
captarVolume()

function volumeJogo(volumeJogo){
    derrota.volume = volumeJogo 
    backgroundMusic.volume = volumeJogo
    bossFight.volume = volumeJogo 
    sonicJ.volume = volumeJogo 
    audio.volume = volumeJogo 
    recebaPoder.volume = volumeJogo
}

//jpgabilidade horizontal
document.addEventListener('mousemove',function(evento){
    let rect = canvado.getBoundingClientRect();
    passaro.x_mouse = evento.clientX - rect.left;

    if(passaro.x_mouse > 500){
        passaro.x_mouse = 500
    }
    if(passaro.x_mouse < 65){
        passaro.x_mouse = 65
    }
})

function sprites(){
    passaro.desenha()
    passaro.frames()
    cano.printa()
    cano2.printa()
    cano.movimento()
    cano2.movimento()
    caixa.desenha()
    caixa.mexe()
    red_cano.printa()
    red_cano2.printa()
}

function loops(){
    if(estadoJogo){
        return;
    }
    c.clearRect(0,0,600,600)
    sprites()
    fase1  = requestAnimationFrame(loops)
}


//luta contra chefe
let mudanca
function alteracaoCenario(){
   mudanca = setInterval(function chefao(){
        if(estadoJogo){
            return
        }
        chefeFinal()
    },20000) 
}

function chefeFinal(){
        if(estadoJogo){
            return
        }
        console.log("chefe")

        cancelAnimationFrame(fase1)
        //clearInterval(dificuldade)
        c.clearRect(0,0,600,600)
        canvado.style.backgroundImage = 'none'
        sprites()
        chefe.frames()
        chefe.desenha()
        
        document.body.style.backgroundColor = 'black'
        canvado.style.backgroundColor = 'red'
        backgroundMusic.pause()
        bossFight.play()
        fase2 = requestAnimationFrame(chefeFinal)
}
alteracaoCenario()

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
    //colisão com o cano(lá ele)
    if (
        passaro.x_mouse + passaro.largura > cano.X &&   
        passaro.x_mouse < cano.X + cano.altura &&       
        passaro.vetorY + passaro.altura > cano.Y && 
        passaro.vetorY < cano.Y + cano.largura  
    ) {
       endgame();
    }
    if (
        passaro.x_mouse + passaro.largura > cano2.X &&   
        passaro.x_mouse < cano2.X + cano2.altura &&       
        passaro.vetorY + passaro.altura > cano2.Y && 
        passaro.vetorY < cano2.Y + cano2.largura  
    ) {
        endgame();
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
        caixa.fundoCaixa = 'imagens/tijolo.png'

    }

    //colisão com cano vermelho
   if (passaro.x_mouse + passaro.largura > red_cano.vetorX && passaro.x_mouse < red_cano.vetorX + red_cano.altura && passaro.vetorY + passaro.altura > red_cano.vetorY && passaro.vetorY < red_cano.vetorY + red_cano.largura  
   ) {
       let limiteX = Math.min(passaro.vetorX + passaro.largura - red_cano.vetorX, red_cano.vetorX + red_cano.largura - passaro.vetorX) 
       let limiteY = Math.min(passaro.vetorY + passaro.altura - red_cano.vetorY, red_cano.vetorY + red_cano.altura - passaro.vetorY) 
       passaro.pula()

           if (limiteX > limiteY) { 
               if (passaro.vetorX < red_cano.vetorX ){ 
                   passaro.vetorX -= limiteX
               }   
               else{ 
               passaro.vetorX += limiteX
               } 
           } 
           else{ 
               if (passaro.vetorY < red_cano.vetorY){ 
                       passaro.vetorY -= limiteY
               } 
               else {
                   passaro.vetorY += limiteY
            } 
           }
   }
   //colisão cano vermelho 2
   if (passaro.x_mouse + passaro.largura > red_cano2.vetorX && passaro.x_mouse < red_cano2.vetorX + red_cano2.altura && passaro.vetorY + passaro.altura > red_cano2.vetorY && passaro.vetorY < red_cano2.vetorY + red_cano2.largura  
   ) {
       let limiteX = Math.min(passaro.vetorX + passaro.largura - red_cano2.vetorX, red_cano2.vetorX + red_cano2.largura - passaro.vetorX) 
       let limiteY = Math.min(passaro.vetorY + passaro.altura - red_cano2.vetorY, red_cano2.vetorY + red_cano2.altura - passaro.vetorY) 
       passaro.pula()

           if (limiteX > limiteY) { 
               if (passaro.vetorX < red_cano2.vetorX ){ 
                   passaro.vetorX -= limiteX
               }   
               else{ 
               passaro.vetorX += limiteX
               } 
           } 
           else{ 
               if (passaro.vetorY < red_cano2.vetorY){ 
                       passaro.vetorY -= limiteY
               } 
               else {
                   passaro.vetorY += limiteY
            } 
           }
   }
   //colisão com chefe
    if (passaro.x_mouse + passaro.largura > chefe.vetorX && 
            passaro.x_mouse < chefe.vetorX + chefe.altura && 
            passaro.vetorY + passaro.altura > chefe.vetorY && 
            passaro.vetorY < chefe.vetorY + chefe.largura  
        ) {
            endgame();
        }

}
//poderes de vida
function poderes(){
    if(caixa.fundoCaixa != 'imagens/tijolo.png'){
        let podale = Math.floor(Math.random()*1)+1
        switch (podale){
            case 1:
                passaro.vida+=100
                document.querySelector('#info').innerHTML = passaro.vida
            case 2:
                passaro.vida+=50
                document.querySelector('#info').innerHTML = passaro.vida
            default:
                console.log('azar') 
        }

    recebaPoder.volume = 0.2
    recebaPoder.play()
    }  
}

//variar posição vetorY do canos
function variaposicao(){
    varia  =  Math.random()*500 + 150
    varia_2 = -800 + varia
    cano.Y = varia
    cano2.Y = varia_2
}

//mudança de cenário
function mudaCenario(){
    let mudafundo = Math.floor(Math.random()*3) + 1
    switch (mudafundo){
        case 1:
            document.body.style.backgroundColor = 'lightblue'
            canvado.style.backgroundImage = 'url(imagens/fundo.jpg)'
            canvado.style.backgroundRepeat = "no-repeat"
            break
        case 2:
            document.body.style.backgroundColor = 'grey'
            canvado.style.backgroundImage = 'url(imagens/urbancity.jpg)'
            canvado.style.backgroundRepeat = "no-repeat"
            break
        case 3:
            document.body.style.backgroundColor = 'lightgreen'
            canvado.style.backgroundImage = 'url(imagens/forest.jpg)'
            canvado.style.backgroundRepeat = "no-repeat"
            break
    }
}

//chefe agressividade
let Luta
function combate(){
    Luta = setInterval(()=>{
        seconds%3==0&&seconds>20?sonicPular():seconds
    },1000)
}


function sonicPular(){
    chefe.vetorX += chefe.condicao
    sonic = requestAnimationFrame(sonicPular)
    sonicJ.play()
    chefe.pula()
}

combate()
//perdeu né, reinicia ai
document.querySelector("#reiniciar").addEventListener('click', ()=>{window.location.reload()})

document.addEventListener("keydown", function(evento){
    if(evento.key == "Enter"){
        estadoJogo = !estadoJogo

        if(!estadoJogo && seconds<20){
            loops()
            alteracaoCenario()
            cronometro()
            //alteracaoDificuldade()
            combate()
        }
        if(!estadoJogo && seconds>=20){
            chefeFinal()
            cronometro()
            //alteracaoDificuldade()
            combate()
        }

        else if(estadoJogo){
            clearInterval(Luta)
            clearInterval(tempo)
            //clearInterval(dificuldade)
            clearInterval(mudanca)
        }
    }
})