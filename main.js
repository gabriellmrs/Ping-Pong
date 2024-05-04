//Capturando o elemento canvas para ativar seu contexto "2d"
const canvasEl = document.querySelector("canvas"),
canvasCtx = canvasEl.getContext("2d"),
gapX = 10 

const mouse = { x: 0, y: 0}

//Objeto com altura, largura (Campo)
const field = {
    w:window.innerWidth,
    h:window.innerHeight,
    //Desenho do Campo
    draw: function() {
        canvasCtx.fillStyle = "#286047"//Define a cor da mesa do jogo
        canvasCtx.fillRect(0, 0, this.w, this.h)//Define o tamanho da mesa
    }
}

//Obejeto Linha
const line = {
    w: 15,//Tamanho da linha que separa os lados do campo
    h: field.h,
    draw: function() {
        canvasCtx.fillStyle = "#ffffff"//Cor da linha no meio do campo
        canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h)//Desenha a linha (O this se refere ao elemento dentro do OBJ)
    }
}

//Raquete esquerda
const leftPaddle = {
    x: gapX,
    y: 0,
    w: line.w,
    h: 200,
    _move: function(){
        //atribui o valor do eixo y ao mouse.y e o - h / 2 deixa o curso no meio da barra
        this.y = mouse.y - this.h / 2 
    },
    draw: function() {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)

        this._move()
    }

}

//Raquete direita
const rightPaddle = {
    x: field.w - line.w - gapX,
    y: 0,
    w: line.w,
    h: 200,
    speed: 3,
    _move: function() {
        if (this.y + this.h / 2 < ball.y + ball.r) {
            this.y += this.speed
        }
        else {
            this.y -= this.speed
        }
       // this.y = ball.y
    },
    speedUp: function () {
        this.speed += 1
    },
    draw: function() {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)

        this._move()
    }
}

//Placar
const score = {
    human: 0,
    computer: 0,
    increaseHuman: function() {
        this.human++
    },
    increaseComputer: function() {
        this.computer++
    },
    draw: function() {
        canvasCtx.font = "bold 72px Arial"
        canvasCtx.textAlign = "center"
        canvasCtx.textBaseline = "top"
        canvasCtx.fillStyle = "#01341D"
        //Posição do placar
        canvasCtx.fillText(this.human, field.w / 4, 50)
        canvasCtx.fillText(this.computer, field.w / 4 + field.w /2, 50)
    }
}

//Bola
const ball = {
    teste: 0,
    x: 0,
    y: 0,
    r: 20,
    speed: 10,
    directionX: 1,
    directionY: 1,
    _calcPosition: function () {
        //Verificar se o jogador 1 fez ponto
        if(this.x > field.w - this.r - gapX - rightPaddle.w) {
            //Verificar se a raquete direita está na posição y da bola
            if(
                this.y + this.r > rightPaddle.y &&
                this.y - this.r <rightPaddle.y + rightPaddle.h
            ) {
                //rebate a bola invertendo o sinal de x
                this._reverseX()
            }
            else {
                //pontuar jogador 1
                score.increaseHuman()
                this._pointUp(  )
            }
        }

        //verificar se o jogador 2 fez ponto
        if(this.x < this.r + leftPaddle.w + gapX) {
            //Verifica se a raquete esquerta está na posição Y da balo
            if(
                this.y + this.r > leftPaddle.y &&
                this.y - this.r < leftPaddle.y + leftPaddle.h) {
                //rebate a bola invertendo o sinal de x
                this._reverseX()
            }
            else {
                //pontuar jogador 2
                score.increaseComputer()
                this._pointUp(  )
            }
        }

        // verifica as laterais superior e inferior do campo
        if (
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.h - this.r && this.directionY > 0)
          ) {
            // rebate a bola invertendo o sinal do eixo Y
            this._reverseY()
          }
    },

    _reverseX: function () {
        this.directionX *= -1
    },

    _reverseY: function () {
        this.directionY *= -1
    },

    _speedUp: function () {
        this.speed += 2
    },

    _pointUp: function () {
        this._speedUp()
        rightPaddle.speedUp()
        this.x = field.w / 2
        this.y = field.h / 2

    },

     _move: function () {
        this.x += this.directionX * this.speed
        this.y += this.directionY * this.speed
    },

    draw: function () {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()

        this._calcPosition()
        this._move()
    }
}

function setup() {
    canvasEl.width = canvasCtx.width = field.w //Define a largura da tela do jogo (preeche toda tela)
    canvasEl.height = canvasCtx.height = field.h//Define a altura da tela do jogo (preeche toda tela)
}

function draw () {
    
    field.draw()
    line.draw()

    leftPaddle.draw()
    rightPaddle.draw()

    score.draw()

    ball.draw()

    
}

//API para fazer uma animação suave
window.animateFrame = (function () {
    return (
        //Verificando o navegador
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        //Atualiza a posição da bola 60 vzs por segundo
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  })()

  function main() {
    animateFrame(main)
    draw()
  }

  setup()
  main()

  //movimentar a raquete com o mouse
  canvasEl.addEventListener("mousemove", function (e) {
    mouse.x = e.pageX
    mouse.y = e.pageY
  }) 
    
  
