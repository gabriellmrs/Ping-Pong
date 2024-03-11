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
    y: 100,
    w: line.w,
    h: 200,
    _move: function() {
        this.y = ball.y
    },
    draw: function() {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)

        this._move()
    }
}

//Bola
const ball = {
    x: 300,
    y: 500,
    r: 20,
    speed: 5,//velocidade dad bola
    //Altera a posição da bola
    _move: function() {
        this.x += 1 * this.speed
        this.y += 1 * this.speed
    },
    draw: function() {
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.beginPath()
        canvasCtx.arc(this.y, this.x, this.r, 0 , 2 * Math.PI, false)
        canvasCtx.fill()

        this._move()
    }
}

//Placar
const score = {
    human: 0,
    computer: 0,
    draw: function() {
        canvasCtx.font = "bold 72px Arial"
        canvasCtx.textAlign = "center"
        canvasCtx.textBaseline = "top"
        canvasCtx.fillStyle = "#01341D"
        canvasCtx.fillText(this.human, field.w / 4, 50)
        canvasCtx.fillText(this.computer, field.w / 4 + field.w /2, 50)
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
    
  
