// March 19, 2023 This script calculates the current Julian day as a variable d and then uses that with known
// orbital parameters to find the heliocentric rectangular coordinates of each planet.
// This is used with an html file showOrbits.html


class SolarSystemBody {
  constructor(name, N0, Nd, i0, id, w0, wd, a0, ad, e0, ed, M0, Md) {
    this.name = name;
    // variables with 0 are constants, variables with d change with d: day
    // N: longitude of the ascending mode; in degrees
    this.N0 = N0;
    this.Nd = Nd;
    // inclination of the ecliptic (plane of the Earth's orbit); in degrees
    this.i0 = i0;
    this.id = id;
    // argument of the perihelion; in degrees
    this.w0 = w0;
    this.wd = wd;
    // semi-major axis, or mean distance to the sun; in AU
    this.a0 = a0;
    this.ad = ad;
    // eccentricity (0: cirlce, 0-1: ellipse, 1: parabola); no unit
    this.e0 = e0;
    this.ed = ed;
    // mean anomaly (0 at paerihelion; angle past perihelion); in degrees
    this.M0 = M0;
    this.Md = Md;
  }
}

function getDay(offset) {
    // assign year, month, and date values
    let u = new Date();
    let hours = u.getUTCHours();
    let day = u.getUTCDate();
    let year = u.getUTCFullYear();
    let month = u.getUTCMonth() + 1;
    
    // calculate day number; notice offset added at end for past or future
    let d = 367 * year - (7 * (year + Math.floor((month + 9) / 12)) )/ 4 + Math.floor(275 * (month / 9)) + day + offset - 730530 + hours/24; 
    console.log(d);
    return d;
}


function eccentricAnomaly (e, M)
{
    var E = M + (e * Math.sin(M*Math.PI/180) * (1.0 + (e * Math.cos(M*Math.PI/180))));
    for(;;) {
        var F = E - (E - (180*e*Math.sin(E*Math.PI/180)/Math.PI) - M) / (1 - e*Math.cos(E*Math.PI/180));
        var error = Math.abs (F - E);
        E = F;
        if (error < 1.0e-8) {
            break;  // the angle is good enough now for our purposes
        }
    }

    return E;
}

function getEarthHeliocentricCoordinates(day) {
        // We use formulas for finding the Sun as seen from Earth, 
        // then negate the (x,y,z) coordinates obtained to get the Earth's position 
        // from the Sun's perspective.

        // http://www.astro.uio.no/~bgranslo/aares/calculate.html       <== Note error in formula for DS, using sin(RS) where it should say sin(LS)
        // http://www.meteorobs.org/maillist/msg09197.html              <== Correct formulas, more accurate (complex)

        // These formulas use 'd' based on days since 1/Jan/2000 12:00 UTC ("J2000.0"), instead of 0/Jan/2000 0:00 UTC ("day value").
        // Correct by subtracting 1.5 days...
        var d = day - 1.5;
        var T = d / 36525.0;                     // Julian centuries since J2000.0
        var L0 = 280.46645 + (36000.76983 * T) + (0.0003032 * T * T);      // Sun's mean longitude, in degrees
        var M0 = 357.52910 + (35999.05030 * T) - (0.0001559 * T * T) - (0.00000048 * T * T * T);      // Sun's mean anomaly, in degrees

        var C =       // Sun's equation of center in degrees
            (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M0*Math.PI/180) +
            (0.01993 - 0.000101 * T) * Math.sin(2 * M0*Math.PI/180) +
            0.000290 * Math.sin(3 * M0*Math.PI/180)
        ;

        var LS = L0 + C;         // true ecliptical longitude of Sun

        var e = 0.016708617 - T * (0.000042037 + (0.0000001236 * T));    // The eccentricity of the Earth's orbit.
        var distanceInAU = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos((M0 + C)*Math.PI/180));     // distance from Sun to Earth in astronomical units (AU)
        var x = -distanceInAU * Math.cos(LS*Math.PI/180);
        var y = -distanceInAU * Math.sin(LS*Math.PI/180);
        var cartesianCoordinates = [x, -y, 0.0, e];
        return cartesianCoordinates;      // the Earth's center is always on the plane of the ecliptic (z=0), by definition!
}

function getHelioCentricCoordinates(solarSystemBody, day) {
    // N: longitude of asending mode
    let N = solarSystemBody.N0 + solarSystemBody.Nd*day;
    // i: inclination to the ecliptic
    let i = solarSystemBody.i0 + solarSystemBody.Nd*day;
    // w: argument of perihelion
    let w = solarSystemBody.w0 + solarSystemBody.wd*day;
    // a: semi-major axis
    let a = solarSystemBody.a0 + solarSystemBody.ad*day;
    // e: eccentricity
    let e = solarSystemBody.e0 + solarSystemBody.ed*day;
    // M: mean anomaly
    let M = solarSystemBody.M0 + solarSystemBody.Md*day;
    
    // find E: eccentric anomaly
    let E = eccentricAnomaly(e, M);
    // find ecliptic coordinates
    let xv = a*(Math.cos(E*Math.PI/180)-e);
    let yv = a*(Math.sqrt(1 - e*e)*Math.sin(E*Math.PI/180));
    
    // find polar angle and radius
    let v = 2*Math.atan(Math.sqrt((1+e)/(1-e))*Math.tan(E*Math.PI/360))*180/Math.PI;
    let r = Math.sqrt(xv*xv + yv*yv);

    // set values for finding heliocentric coordinates
    let cosN = Math.cos(N*Math.PI/180);
    let sinN = Math.sin(N*Math.PI/180);
    let cosi = Math.cos(i*Math.PI/180);
    let sini = Math.sin(i*Math.PI/180);
    let cosVw = Math.cos((v+w)*Math.PI/180);
    let sinVw = Math.sin((v+w)*Math.PI/180);

    // find heliocentric coordinates
    let xh = r*(cosN*cosVw - sinN*sinVw*cosi);
    let yh = r*(sinN*cosVw + cosN*sinVw*cosi);
    let zh = r*sinVw*sini;

    // the yh is opposite because it was showing the planets with opposite y-values than those
    // seen in https://www.theplanetstoday.com/ and NASA's eyes.nasa.gov
    let helioCoord = [xh, -yh, zh, e];
    return helioCoord;
}

function definePlanetCoordinates(offset) {

    var dayNow = getDay(offset);
    console.log("Daynow: "+dayNow);

      // Define the planet orbital information
      const Mercury = new SolarSystemBody("Mercury", 48.3313, 3.24587e-5, 7.0047, 5.0e-8, 29.1241, 1.01444e-5, 0.387098, 0.0, 0.205635, 5.59e-10, 168.6562, 4.0923344368);
      const Venus = new SolarSystemBody("Venus", 76.6799, 2.46590e-5, 3.3946, 2.75e-8, 54.8910, 1.38374e-5, 0.723330, 0.0, 0.006773, -1.302e-9, 48.0052, 1.6021302244);
      const Mars = new SolarSystemBody("Mars", 49.5574, 2.11081e-5, 1.8497, -1.78e-8, 286.5016, 2.92961e-5, 1.523688, 0.0, 0.093405, 2.516e-9, 18.6021, 0.5240207766);
      const Jupiter = new SolarSystemBody("Jupiter", 100.4542, 2.76854e-5, 1.3030, -1.557e-7, 273.8777, 1.64505e-5, 5.20256, 0.0, 0.048498, 4.469e-9, 19.8950, 0.0830853001);
      const Saturn = new SolarSystemBody("Saturn", 113.6634, 2.38980e-5, 2.4886, -1.081e-7, 339.3939, 2.97661e-5, 9.55475, 0.0, 0.055546, -9.499e-9, 316.9670, 0.0334442282);
      const Uranus = new SolarSystemBody("Uranus", 74.0005, 1.3978e-5, 0.7733, 1.9e-8, 96.6612, 3.0565e-5, 19.18171, -1.55e-8, 0.047318, 7.45e-9, 142.5905, 0.011725806);
      const Neptune = new SolarSystemBody("Neptune", 131.7806, 3.0173e-5, 1.7700, -2.55e-7, 272.8461, -6.027e-6, 30.05826, 3.313e-8, 0.008606, 2.15e-9, 260.2471, 0.005995147);

    let mercuryHeliocentricCoordinates = getHelioCentricCoordinates(Mercury, dayNow);
    let venusHeliocentricCoordinates = getHelioCentricCoordinates(Venus, dayNow);
    let earthHeliocentricCoordinates =  getEarthHeliocentricCoordinates(dayNow);
    let marsHeliocentricCoordinates = getHelioCentricCoordinates(Mars, dayNow);
    let jupiterHeliocentricCoordinates = getHelioCentricCoordinates(Jupiter, dayNow);
    let saturnHeliocentricCoordinates = getHelioCentricCoordinates(Saturn, dayNow);
    let uranusHeliocentricCoordinates = getHelioCentricCoordinates(Uranus, dayNow);
    let neptuneHeliocentricCoordinates = getHelioCentricCoordinates(Neptune, dayNow);

    // Add planet colors
    mercuryHeliocentricCoordinates.push('grey');
    venusHeliocentricCoordinates.push('orange');
    earthHeliocentricCoordinates.push('blue');
    marsHeliocentricCoordinates.push('red');
    jupiterHeliocentricCoordinates.push('#C99700');
    saturnHeliocentricCoordinates.push('#D6BF86');
    uranusHeliocentricCoordinates.push('lightblue');
    neptuneHeliocentricCoordinates.push('darkblue');

    // Put all the planets in an array to loop through.
    const planets = [
        mercuryHeliocentricCoordinates,
        venusHeliocentricCoordinates,
        earthHeliocentricCoordinates,
        marsHeliocentricCoordinates,
        jupiterHeliocentricCoordinates,
        saturnHeliocentricCoordinates,
        uranusHeliocentricCoordinates,
        neptuneHeliocentricCoordinates
    ];

    return planets;
}