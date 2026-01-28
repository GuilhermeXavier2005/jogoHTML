let canvado = document.getElementById("jogo")
let c = canvado.getContext('2d')
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
        if(chefe.vetorX+10 >= 540){
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
    var audio =  new Audio('../audio/audio_wing.wav')
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

function endgame(){
//passaro.vida -= 7
document.querySelector('#info').innerHTML = passaro.vida
if(passaro.vida <=0){
    clearInterval(tempo)
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

/*document.addEventListener('mousemove',function(evento){
    let rect = canvado.getBoundingClientRect();
    passaro.x_mouse = evento.clientX - rect.left;

    if(passaro.x_mouse > 560){
        passaro.x_mouse = 560
    }
    if(passaro.x_mouse < 1){
        passaro.x_mouse = 1
    }
})*/



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
        caixa.fundoCaixa = '../imagens/tijolo.png'

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
        if (passaro.x_mouse + passaro.largura > chefe.vetorX && 
            passaro.x_mouse < chefe.vetorX + chefe.altura && 
            passaro.vetorY + passaro.altura > chefe.vetorY && 
            passaro.vetorY < chefe.vetorY + chefe.largura  
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
    chefe.vetorX += chefe.condicao
    chefe.pulo = 1
    sonic = requestAnimationFrame(sonicPular)
    chefe.pula()
}

document.addEventListener("keydown", function(event){
    if(event.code == 'Space')
    passaro2.pula()
})

document.addEventListener('keypress', function(event){
    if(event.code == "KeyA")
    passaro2.vetorX -= 25
    
    if(event.code == "KeyD")
    passaro2.vetorX += 25

    if(event.code == "KeyW")
    passaro2.vetorY -= 25

    if(event.code == "KeyS")
    passaro2.vetorY += 25
})