
function drawMoon(age) {
    
    const semiMajorAxis = 150;

    moonctx.clearRect(0, 0, moonCanvas.width, moonCanvas.height);
    const moonAge = 29.530588853;
    const halfMoonAge = moonAge/2;
    const quarterMoonAge = moonAge/4;
    const dark = "#1C1C1E";

    if (age > moonAge) {
      age = age - moonAge;
    }
    if (age < 0) {
      age = age + moonAge;
    }

    // ctx.fillStyle = 'black';
    // ctx.beginPath();
    // ctx.ellipse(centerX, centerY, semiMajorAxis, semiMinorAxis, 0, 0, 2 * Math.PI);
    // ctx.fill();


    if (age < quarterMoonAge) {

      // Waxing Crescent Moon
      const semiMinorAxis = semiMajorAxis * (Math.sin((Math.PI/2)*Math.abs(age - quarterMoonAge) / quarterMoonAge));

      moonctx.fillStyle = 'white';
      moonctx.beginPath();
      moonctx.arc(centerX, centerY, semiMajorAxis, 0, 2 * Math.PI);
      moonctx.fill();

      moonctx.fillStyle = dark;
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMajorAxis, semiMajorAxis, 0, Math.PI/2, -Math.PI/2);
      moonctx.fill();

      moonctx.fillStyle = dark;
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMinorAxis, semiMajorAxis, 0, -Math.PI/2, Math.PI/2);
      moonctx.fill();
    } else if (age < halfMoonAge) {

      // Waxixng Gibbous Moon
      const semiMinorAxis = semiMajorAxis * (Math.sin((Math.PI/2)*Math.abs(age - quarterMoonAge) / quarterMoonAge));

      moonctx.fillStyle = dark;
      moonctx.beginPath();
      moonctx.arc(centerX, centerY, semiMajorAxis, 0, 2 * Math.PI);
      moonctx.fill();

      moonctx.fillStyle = 'white';
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMajorAxis, semiMajorAxis, 0, -Math.PI/2, Math.PI/2);
      moonctx.fill();

      moonctx.fillStyle = 'white';
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMinorAxis, semiMajorAxis, 0, Math.PI/2, -Math.PI/2);
      moonctx.fill();
    } else if (age < (halfMoonAge + quarterMoonAge)) {

      // Waning Gibbous Moon
      const semiMinorAxis = semiMajorAxis * Math.sin((Math.PI/2)*(1 - Math.abs(age - halfMoonAge) / quarterMoonAge));

      moonctx.fillStyle = dark;
      moonctx.beginPath();
      moonctx.arc(centerX, centerY, semiMajorAxis, 0, 2 * Math.PI);
      moonctx.fill();

      moonctx.fillStyle = 'white';
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMajorAxis, semiMajorAxis, 0, Math.PI/2, -Math.PI/2);
      moonctx.fill();

      moonctx.fillStyle = 'white';
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMinorAxis, semiMajorAxis, 0, -Math.PI/2, Math.PI/2);
      moonctx.fill();
  } else {
    // Waning Crescent Moon
      const semiMinorAxis = semiMajorAxis * (Math.sin((Math.PI/2)*Math.abs(age - (halfMoonAge + quarterMoonAge)) / quarterMoonAge));


      moonctx.fillStyle = 'white';
      moonctx.beginPath();
      moonctx.arc(centerX, centerY, semiMajorAxis, 0, 2 * Math.PI);
      moonctx.fill();

      moonctx.fillStyle = dark;
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMajorAxis, semiMajorAxis, 0, -Math.PI/2, Math.PI/2);
      moonctx.fill();

      moonctx.fillStyle = dark;
      moonctx.beginPath();
      moonctx.ellipse(centerX , centerY, semiMinorAxis, semiMajorAxis, 0, Math.PI/2, -Math.PI/2);
      moonctx.fill();
  }
}