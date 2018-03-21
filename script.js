var GraficoPizza = function(opcoes) {
  this.opcoes = opcoes;
  this.canvas = opcoes.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.cores = opcoes.cores;

  this.desenhar = function(){
    var valor_total = 0;
    var indice_cor = 0;
    for(var categoria in this.opcoes.data) {
      var val = this.opcoes.data[categoria];
      valor_total += val;
    }

    if(this.opcoes.legenda){
      indice_cor = 0;
      var legendaHTML = "";
      for(categoria in this.opcoes.data){
        legendaHTML += "<div style='font-family:Helvetica; color:#404040'><span style='display:inline-block;width:20px;background-color:" +
        this.cores[indice_cor++]+";'>&nbsp;</span> " + categoria + "</div>";
      }
      this.opcoes.legenda.innerHTML = legendaHTML;
    }

    var comeco_angulo = 0;
    for(categoria in this.opcoes.data){
      val=this.opcoes.data[categoria];
      var pedaco_angulo = 2 * Math.PI *val / valor_total;

      desenharGraficoPizza(
        this.ctx,
        this.canvas.width/2,
        this.canvas.height/2,
        Math.min(this.canvas.width/2, this.canvas.height/2),
        comeco_angulo,
        comeco_angulo + pedaco_angulo,
        this.cores[indice_cor%this.cores.length]
      );

      comeco_angulo += pedaco_angulo;
      indice_cor++;
    }

    //desenhar um círculo branco em cima do gráfico
    //se for um gráfico em rosquinha
    if(this.opcoes.tamanhoBuracoRosquinha) {
      desenharGraficoPizza(
        this.ctx,
        this.canvas.width/2,
        this.canvas.height/2,
        this.opcoes.tamanhoBuracoRosquinha * Math.min(this.canvas.width/2, this.canvas.height/2),
        0,
        2 * Math.PI,
        "#ffffff"
      );
    }

    //adicionar a porcentagem
    comeco_angulo = 0;
    for(categoria in this.opcoes.data) {
      val = this.opcoes.data[categoria];
      pedaco_angulo = 2 * Math.PI * val/valor_total;
      var pizzaRaio = Math.min(this.canvas.width/2,this.canvas.height/2);
      var labelX = this.canvas.width/2 + (pizzaRaio/2) * Math.cos(comeco_angulo + pedaco_angulo/2);
      var labelY = this.canvas.height/2 + (pizzaRaio/2) * Math.sin(comeco_angulo + pedaco_angulo/2);

      if(this.opcoes.tamanhoBuracoRosquinha){
        var offset = (pizzaRaio * this.opcoes.tamanhoBuracoRosquinha)/2;
        labelX = this.canvas.width/2 + (offset + pizzaRaio/2) * Math.cos(comeco_angulo + pedaco_angulo/2);
        labelY = this.canvas.height/2 + (offset + pizzaRaio/2) * Math.sin(comeco_angulo + pedaco_angulo/2);
      }

      var labelTexto = Math.round(100 * val / valor_total);
      this.ctx.fillStyle = "#404040";
      this.ctx.font = "15px Arial";
      this.ctx.fillText(labelTexto+"%", labelX, labelY);
      comeco_angulo += pedaco_angulo;
    }

  }
}

function desenharLinha(ctx, comecoX, comecoY, fimX, fimY) {
  ctx.beginPath();
  ctx.moveTo(comecoX, comecoY);
  ctx.lineTo(fimX, fimY);
  ctx.stroke();
}

function desenharArco(ctx, centroX, centroY, raio, comecoAngulo, fimAngulo) {
  ctx.beginPath();
  ctx.arc(centroX, centroY, raio, comecoAngulo, fimAngulo);
  ctx.stroke();
}

function desenharGraficoPizza(ctx, centroX, centroY, raio, comecoAngulo, fimAngulo, cor) {
  ctx.fillStyle = cor;
  ctx.beginPath();
  ctx.moveTo(centroX, centroY);
  ctx.arc(centroX, centroY, raio, comecoAngulo, fimAngulo);
  ctx.closePath();
  ctx.fill();
}

var meusAlbuns = {
  "Rap": 9,
  "Rock": 14,
  "Blues": 2,
  "Pop": 6,
  "Alternativa": 5,
  "Folk": 7,
  "Pagode": 3
};

var meuGraficoPizza = document.getElementById("meuGraficoPizza");
meuGraficoPizza.width = 300;
meuGraficoPizza.height = 300;

var ctx = meuGraficoPizza.getContext("2d");

var minhaLegenda = document.getElementById("minhaLegenda");

var meuGraficoPizza = new GraficoPizza(
    {
        canvas:meuGraficoPizza,
        data:meusAlbuns,
        cores:["#a8e6cf","#dcedc1", "#ffd3b6","#ffaaa5","#ff8b94","#fdf5c9","#ffc5d9"],
        legenda: minhaLegenda
    }
);
meuGraficoPizza.desenhar();

var meuGraficoRosquinha = document.getElementById("meuGraficoRosquinha");
meuGraficoRosquinha.width = 300;
meuGraficoRosquinha.height = 300;

var ctx = meuGraficoRosquinha.getContext("2d");

var meuGraficoRosquinha = new GraficoPizza(
    {
        canvas:meuGraficoRosquinha,
        data:meusAlbuns,
        cores:["#a8e6cf","#dcedc1", "#ffd3b6","#ffaaa5","#ff8b94","#fdf5c9","#ffc5d9"],
        tamanhoBuracoRosquinha:0.5,
        legenda: minhaLegenda
    }
);
meuGraficoRosquinha.desenhar();
