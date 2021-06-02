// Variavel classificadora
let classifier;
// URL do modelo treinado
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/SnvBOaEge/';
  
// Video
let video;
let flippedVideo;
// Guarda as classificações
let label = "";

let Preto;
let PretoFade = 0;

let Azul;
let AzulFade = 0;

let Verde;
let VerdeFade = 0;

let Rosa;
let RosaFade = 0;

let Amarelo;
let AmareloFade = 0;



// Carrega o modelo
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  Preto = loadImage('img/oel.png');//Standby
  Azul = loadImage('img/Chola.png');//Chorando
  Verde = loadImage('img/fiesta.png');//Comemoração
  Rosa = loadImage('img/Love.png');//coraçõeszinhos
  Amarelo = loadImage('img/Hahaha.png');//Risos
}

function setup() {
  var myCanvas = createCanvas(720, 480);
  myCanvas.parent("canvas");
  // Inicia a webcam e mostra na tela
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Inicia a classificação
  classifyVideo();
}

function draw() {
  background(0);
  imageMode(CORNER);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);
  
  // Chama as imagens quando a ação for realizada
  if (label == 'Preto') {
    PretoFade = 255;
  }   
  else if (label == 'Azul') {
    AzulFade = 255;
  } 
  else if (label == 'Verde') {
    VerdeFade = 255;
  } 
  else if (label == 'Rosa') {
    RosaFade = 255;
  }
  else if (label == 'Amarelo') {
    AmareloFade = 255;
    
  }
  
  // Desaparece com a imagem após a ação
  if (PretoFade > 0) {
    tint(255, PretoFade);
    image(Preto, 0, 0);
    PretoFade -= 15;
  }
  if (AzulFade > 0) {
    tint(255, AzulFade);
    image(Azul, 0, 0);
    AzulFade -= 15;
  }
  if (VerdeFade > 0) {
    tint(255, VerdeFade);
    image(Verde, 0, 0);
    VerdeFade -= 15;
  }
  if (RosaFade > 0) {
    tint(255, RosaFade);
    image(Rosa, 0, 0);
    RosaFade -= 15;
  }
  if (AmareloFade > 0) {
    tint(255, AmareloFade);
    image(Amarelo, 0, 0);
    AmareloFade -= 15;
  }
    
  // Identifica a Ação
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // O resultado está na lista ordenada por confiança.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

