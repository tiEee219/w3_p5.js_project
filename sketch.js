let x = 0;
let y = 0;
let angle = 0;

let beat;
let analyzer;

function preload() {
  beat = loadSound("beat.mp3");
}

function setup() {
  createCanvas(720, 400);
  noStroke();
  x = width / 2;
  y = height / 2;

  analyzer = new p5.Amplitude();
  analyzer.setInput(beat);
  analyzer.smooth(0.6);
}

function draw() {
  background(51);

  let level = 0;

  if (beat.isPlaying()) {
    level = analyzer.getLevel();
    angle += 0.03;
  }
  let radius = map(level, 0, 0.3, 0, 250, true);
  let targetX = width / 2 + cos(angle) * radius;
  let targetY = height / 2 + sin(angle) * radius * 0.5;
  x = lerp(x, targetX, 0.05);
  y = lerp(y, targetY, 0.05);

  fill(255);
  ellipse(x, y, 66, 66);
  textAlign(CENTER, CENTER);
  textSize(16);

  let message = beat.isPlaying()
    ? "Click to stop"
    : "Click to play";

  text(message, width / 2, height - 25);
}

async function mousePressed() {
  if (
    mouseX < 0 || mouseX > width ||
    mouseY < 0 || mouseY > height
  ) {
    return;
  }

  if (!beat || !beat.isLoaded()) {
    return;
  }
  await userStartAudio();

  if (beat.isPlaying()) {
    beat.stop();
  } else {
    beat.loop();
  }
}
