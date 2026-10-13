let beat;
let analyzer;

function preload() {
  beat = loadSound('beat.mp3');
}

function setup() {
  let myCanvas = createCanvas(600, 400);
  myCanvas.parent('myContainer');

  analyzer = new p5.Amplitude();
  analyzer.setInput(beat);
  analyzer.smooth(0.8);

  background("255");
  noStroke();
}

function draw() {
  background("255");

  let rms = 0;
  if (analyzer) {
    rms = analyzer.getLevel();
  }

  let size = map(rms, 0, 0.5, 40, 260);

  fill("#e98aaa");
  ellipse(width / 2, height / 2, size, size);

  fill("#5d083b");
  textAlign(CENTER, CENTER);
  textSize(17);
  text('Click to play / stop', width / 2, height - 30);
}

function mousePressed() {
  if (!beat || !beat.isLoaded()) {
    return;
  }

  if (beat.isPlaying()) {
    beat.stop();
  } else {
    beat.loop();
  }
}