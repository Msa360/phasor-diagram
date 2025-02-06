function setup() {
    createCanvas(600, 600);
    let saveButton = createButton('Download Diagram');
    saveButton.position(10, 10);
    saveButton.mousePressed(downloadDiagram);
    drawPhasorDiagram();
  }
  
  function drawPhasorDiagram() {
    background(255);
    translate(width / 2, height / 2); // Move origin to center
  
    let phasors = [
      { magnitude: 111.34, angle: -90, label: 'QT' },
      { magnitude: 123.01, angle: -90, label: 'Qc' },
      { magnitude: 144, angle: -53.13, label: 'Qch' },
      { magnitude: 4.8, angle: 46.87, label: 'S' },
    ];
  
    let scaleFactor = 2; // Scale factor for better visibility
  
    // Draw axes
    stroke(150);
    line(-width / 2, 0, width / 2, 0); // X-axis
    line(0, -height / 2, 0, height / 2); // Y-axis
  
    for (let phasor of phasors) {
      let angleRad = radians(phasor.angle);
      let x = phasor.magnitude * cos(angleRad) * scaleFactor;
      let y = phasor.magnitude * sin(angleRad) * scaleFactor;
  
      stroke(0, 0, 255);
      strokeWeight(2);
      line(0, 0, x, -y); // Negate y since p5.js y-axis is inverted
      
      fill(0);
      textSize(14);
      textAlign(CENTER, CENTER);
      text(phasor.label, x * 1.1, -y * 1.1);
    }
  }
  
  function downloadDiagram() {
    saveCanvas('phasor_diagram', 'png');
  }
  