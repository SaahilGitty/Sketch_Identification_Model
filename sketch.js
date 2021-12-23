const result = document.getElementById("result")
const confidenceLabel = document.getElementById("confidence")

function preload() {
  ml5Classifier = ml5.imageClassifier("Doodlenet")
}

function setup() {
  canvas = createCanvas(200 , 200);
  canvas.center()
  canvas.mouseReleased(classifyCanvas)
  synth = window.speechSynthesis;
}
                        
function draw() {
  strokeWeight(13);
  stroke(0);
  
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY)
  }
}

function classifyCanvas() {
  ml5Classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if(error){
    console.error(error)
  }else {
    result.innerHTML = "What I Think You Sketched: " + results[0].label;
    confidenceLabel.innerHTML = "How confident I am: " + Math.round(results[0].confidence * 100) + "%"
    utterThis = results[0].label;
    synth.speak(utterThis);
  }
}

function clearCanvas() {
  background("white");
}