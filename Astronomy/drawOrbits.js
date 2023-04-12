function drawOrbits(planets) {

  // clear Canvas
  ctx.clearRect(0, 0, solarCanvas.width, solarCanvas.height);

  // Draw the Sun
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(solarCanvas.width / 2, solarCanvas.height / 2, 10, 0, 2 * Math.PI);
  ctx.fill();

  // Count to keep track of the order of planets.
  var planetCount = 1;
  
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];

    // Calculate the angle the planet is from the sun
    let angle = (180/Math.PI)*Math.atan2(planet[1],planet[0]);

    // Calculate the major and minor axis lengths
    // Fix later?  Just making it a circle for now
    let a = 40*planetCount;
    let b = a;

    // Draw the orbit ellipse
    ctx.lineWidth = 5;
    ctx.strokeStyle = planet[4];
    ctx.beginPath();
    ctx.ellipse(solarCanvas.width / 2, solarCanvas.height / 2, a, b, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw the planet as a circle
    let planetX = a*Math.cos(angle*Math.PI/180);
    let planetY = b*Math.sin(angle*Math.PI/180);
    ctx.beginPath();
    ctx.arc(solarCanvas.width / 2 + planetX, solarCanvas.height / 2 + planetY, planetSize, 0, 2*Math.PI);
    ctx.fillStyle = planet[4];
    ctx.fill();

    // Draw Saturn's rings
    if (planetCount == 6) {
      ctx.beginPath();
      ctx.ellipse(solarCanvas.width / 2 + planetX, solarCanvas.height / 2 + planetY, 15, 5, 0, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(214, 191, 134, 0.7)';
      ctx.fill();
    }

    // increment for next planet
    planetCount++;
  }
}