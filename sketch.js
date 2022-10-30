//Variáveis Bolinha
let xBolinha = 300
let yBolinha = 200
let diametroBolinha = 13
let raioBolinha = diametroBolinha / 2

//Velocidade da Bolinha
let velocidadeXBolinha = 6
let velocidadeYBolinha = 5

//Variáveis Jogador
let xJogador = 5
let yJogador = 150

//Variáveis Raquete
let larguraRaquete = 10
let alturaRaquete = 90
let radiusRaquete = 10

//Velocidade Raquete Jogador
let movimentoYJogador =10

//Variáveis Computador
let xComputador = 585
let yComputador = 150
let chanceDeErrar = 0

// p5.Collide
let acerto = false

//Variáveis Placar
let placarJogador = 0
let placarComputador = 0

//Varíveis Sons
let raquetada
let ponto
let musica

function preload() 
{
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}
function setup()
{
    createCanvas(600, 400);
    trilha.loop()
}

function draw()
{
    background(0);
    bolinha()
    jogador()
    computador()
    verificarColisao(xJogador, yJogador)
    verificarColisao(xComputador, yComputador)
    placar()
    resetarBolinha()
}

function bolinha()
{
    // Bolinha
    circle(xBolinha, yBolinha, diametroBolinha)

    // Aceleração da Bolinha
    xBolinha += velocidadeXBolinha
    yBolinha += velocidadeYBolinha

    // Verificar colisão da borda
    if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0)
    {
        velocidadeXBolinha *= -1
    }
    if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0)
    {
      velocidadeYBolinha *= -1
    }

}

function jogador()
{
    // Jogador
    rect(xJogador, yJogador, larguraRaquete, alturaRaquete, radiusRaquete);

    // Movimento Jogador
    if (keyIsDown(87))
    {
        yJogador = yJogador - movimentoYJogador;
    }

    if (keyIsDown(83))
    {
        yJogador = yJogador + movimentoYJogador;
    }
}

function computador()
{
    // Computador
    rect(xComputador, yComputador, larguraRaquete, alturaRaquete, radiusRaquete);
  
    velocidadeYOponente = yBolinha - yComputador - larguraRaquete / 2 - 70;
    yComputador += velocidadeYOponente
}

function verificarColisao(x, y)
{
    acerto = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
    if (acerto) 
    {
      velocidadeXBolinha *= -1
      raquetada.play()
    } 
}

function placar(){
  stroke(255)
  textSize(16)
  textAlign(CENTER)
  fill(255, 140, 0)
  rect(150, 10, 40, 20)
  rect(450, 10, 40, 20)
  fill(255)
  text(placarJogador, 170, 26)
  text(placarComputador, 470, 26)
  
  if (xBolinha > 590) 
    {
        placarJogador += 1;
        ponto.play()
    }
  if (xBolinha < 10) 
    {
        placarComputador += 1;
        ponto.play()
    }
}

function resetarBolinha() {
  if (xBolinha < 10) {
    xBolinha = 300
    yBolinha = 200
    velocidadeXBolinha *= -1
  } else if (xBolinha > 590){
    xBolinha = 300
    yBolinha = 200
    velocidadeXBolinha *= -1
  }
}